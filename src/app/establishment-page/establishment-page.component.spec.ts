import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentPageComponent } from './establishment-page.component';

describe('EstablishmentPageComponent', () => {
  let component: EstablishmentPageComponent;
  let fixture: ComponentFixture<EstablishmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
