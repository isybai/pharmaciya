import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationDbComponent } from './accomodation-db.component';

describe('AccomodationDbComponent', () => {
  let component: AccomodationDbComponent;
  let fixture: ComponentFixture<AccomodationDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
