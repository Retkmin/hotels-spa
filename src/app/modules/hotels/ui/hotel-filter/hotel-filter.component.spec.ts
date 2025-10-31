import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelFilterComponent } from './hotel-filter.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HotelFilterComponent', () => {
  let component: HotelFilterComponent;
  let fixture: ComponentFixture<HotelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelFilterComponent, TranslateModule.forRoot()],

    }).compileComponents();
    fixture = TestBed.createComponent(HotelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterChange event with correct values', () => {
    spyOn(component.filterChange, 'emit');
    component.filterForm.patchValue({
      name: 'Hotel',
      stars: [false, false, true, false, false],
      rate: 4,
      price: 500
    });
    component.emitFilter();
    expect(component.filterChange.emit).toHaveBeenCalledWith({
      name: 'Hotel',
      stars: [3],
      rate: 4,
      price: 500
    });
  });
});
