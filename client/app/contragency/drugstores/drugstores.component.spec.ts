import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugstoresComponent } from './drugstores.component';

describe('DrugstoresComponent', () => {
  let component: DrugstoresComponent;
  let fixture: ComponentFixture<DrugstoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugstoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugstoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
