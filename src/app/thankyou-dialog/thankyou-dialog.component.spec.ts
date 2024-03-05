import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouDialogComponent } from './thankyou-dialog.component';

describe('ThankyouDialogComponent', () => {
  let component: ThankyouDialogComponent;
  let fixture: ComponentFixture<ThankyouDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankyouDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyouDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
