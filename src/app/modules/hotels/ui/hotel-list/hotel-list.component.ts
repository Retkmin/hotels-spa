import { Component, OnInit, signal, WritableSignal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HotelsApiService } from '../../application/services/hotels-api.service';
import { Location } from '@angular/common';
import { Hotel } from '../../domain/hotel.model';
import { HotelFilterComponent } from '../hotel-filter/hotel-filter.component';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, HotelFilterComponent],
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  public readonly hotels: WritableSignal<Hotel[]> = signal<Hotel[]>([]);
  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  public readonly page: WritableSignal<number> = signal<number>(1);
  public readonly perPage: WritableSignal<number> = signal<number>(10);
  public readonly prev: WritableSignal<number | null> = signal<number | null>(null);
  public readonly next: WritableSignal<number | null> = signal<number | null>(null);
  public readonly last: WritableSignal<number> = signal<number>(1);

  constructor(private readonly hotelsApi: HotelsApiService, private location: Location) {}

  public goBack(): void {
    this.location.back();
  }

  public ngOnInit(): void {
    this.loadHotels();
  }

  public goNext(): void {
    if (this.next() !== null) {
      this.page.set(this.next()!);
      this.loadHotels();
    }
  }

  public goPrev(): void {
    if (this.prev() !== null) {
      this.page.set(this.prev()!);
      this.loadHotels();
    }
  }

  public trackByHotelId(_: number, hotel: Hotel): string {
    return hotel.id;
  }

  private loadHotels(): void {
    this.loading.set(true);
    this.hotelsApi.getHotels(this.page(), this.perPage()).subscribe((res) => {
      this.hotels.set(res.data);
      this.loading.set(false);
      this.prev.set(res.prev);
      this.next.set(res.next);
      this.last.set(res.last);
    });
  }
  getFiveStarsArray(): number[] {
    return [0, 1, 2, 3, 4];
  }
}
