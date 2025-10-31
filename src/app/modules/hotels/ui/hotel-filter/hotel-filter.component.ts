import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hotel-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['./hotel-filter.component.scss']
})
export class HotelFilterComponent implements OnInit {
  @Input() initialRate: number = 0;
  @Input() initialPrice: number = 1000;
  public filterForm!: FormGroup;
  public readonly starsList = [1, 2, 3, 4, 5];

  @Output() filterChange = new EventEmitter<{
    name: string;
    stars: number[];
    rate: number;
    price: number;
  }>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [''],
      stars: this.formBuilder.array(this.starsList.map(() => new FormControl(false))),
      rate: [this.initialRate],
      price: [this.initialPrice]
    });
  }

  public emitFilter(): void {
    const filterform = this.filterForm.value;
    const selectedStars = this.starsList.filter((_, i) => filterform.stars[i]);
    this.filterChange.emit({
      name: filterform.name,
      stars: selectedStars,
      rate: filterform.rate,
      price: filterform.price
    });
  }

  public get starsFormArray(): FormArray<FormControl<boolean>> {
    return this.filterForm.get('stars') as FormArray<FormControl<boolean>>;
  }
}
