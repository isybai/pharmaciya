import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UstavComponent } from './ustav.component';

describe('UstavComponent', () => {
  let component: UstavComponent;
  let fixture: ComponentFixture<UstavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UstavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UstavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
