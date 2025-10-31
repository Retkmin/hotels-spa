import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HotelListComponent } from './hotel-list.component';
import { HotelsApiService } from '../../infrastructure/services/hotels-api.service';
import { Hotel } from '../../domain/hotel.model';
import { HotelsDto } from '../../application/dtos/hotel.dto';
import { TranslateModule } from '@ngx-translate/core';
import { Location } from '@angular/common';

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;
  let locationSpy: jasmine.SpyObj<Location>;


  beforeEach(async () => {
    locationSpy = jasmine.createSpyObj('Location', ['back']);
    await TestBed.configureTestingModule({
      imports: [HotelListComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: Location, useValue: locationSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadHotels and update page on goNext', () => {
    const hotelsApiService = TestBed.inject(HotelsApiService);
    const mockHotel = {
      id: '1',
      name: 'Test Hotel',
      image: 'test.jpg',
      address: 'Test Address',
      stars: 3,
      rate: 4.5,
      price: 200
    };
    const mockResponse = {
      data: [mockHotel],
      prev: 1,
      next: 3,
      last: 5,
      first: 1,
      pages: 5,
      items: 1
    } as HotelsDto;
    spyOn(hotelsApiService, 'getHotelsFiltered').and.returnValue(of(mockResponse));
    component.page.set(1);
    component.next.set(2);
    component.goNext();
    expect(component.page()).toBe(2);
    expect(hotelsApiService.getHotelsFiltered).toHaveBeenCalledWith(
      2,
      component.perPage(),
      component.filterState.name,
      component.filterState.stars,
      component.filterState.rate,
      component.filterState.price
    );
  });

  it('should call loadHotels and update page on goPrev', () => {
    const hotelsApiService = TestBed.inject(HotelsApiService);
    const mockHotel = {
      id: '1',
      name: 'Test Hotel',
      image: 'test.jpg',
      address: 'Test Address',
      stars: 3,
      rate: 4.5,
      price: 200
    };
    const mockResponse = {
      data: [mockHotel],
      prev: 1,
      next: 3,
      last: 5,
      first: 1,
      pages: 5,
      items: 1
    } as HotelsDto;
    spyOn(hotelsApiService, 'getHotelsFiltered').and.returnValue(of(mockResponse));
    component.page.set(2);
    component.prev.set(1);
    component.goPrev();
    expect(component.page()).toBe(1);
    expect(hotelsApiService.getHotelsFiltered).toHaveBeenCalledWith(
      1,
      component.perPage(),
      component.filterState.name,
      component.filterState.stars,
      component.filterState.rate,
      component.filterState.price
    );

  });

  it('should trackByHotelId', () => {
    const hotel = { id: 'abc123' } as Hotel;
    expect(component.trackByHotelId(0, hotel)).toBe('abc123');
  });

  it('should call location.back when goBack is called', () => {
    component.goBack();
    expect(locationSpy.back).toHaveBeenCalled();
  });

  it('should getFiveStarsArray', () => {
    const result = component.getFiveStarsArray();
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('should load hotels after filter emit', () => {
    const hotelsApiService = TestBed.inject(HotelsApiService);
    const mockHotel = {
      id: '1',
      name: 'Test Hotel',
      image: 'test.jpg',
      address: 'Test Address',
      stars: 3,
      rate: 4.5,
      price: 200
    };
    const mockResponse = {
      data: [mockHotel],
      prev: 1,
      next: 3,
      last: 5,
      first: 1,
      pages: 5,
      items: 1
    } as HotelsDto;
    spyOn(hotelsApiService, 'getHotelsFiltered').and.returnValue(of(mockResponse));
    const newFilter = { name: 'test', stars: [3], rate: 4, price: 500 };
    component.onFilterChange(newFilter);

    expect(component.page()).toBe(1);
    expect(hotelsApiService.getHotelsFiltered).toHaveBeenCalledWith(
      1,
      component.perPage(),
      newFilter.name,
      newFilter.stars,
      newFilter.rate,
      newFilter.price
    );
    expect(component.filteredHotels()).toEqual([mockHotel]);
    expect(component.prev()).toBe(1);
    expect(component.next()).toBe(3);
    expect(component.last()).toBe(5);
  });

});
