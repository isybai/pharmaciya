import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentdocComponent } from './rentdoc.component';

describe('RentdocComponent', () => {
  let component: RentdocComponent;
  let fixture: ComponentFixture<RentdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
