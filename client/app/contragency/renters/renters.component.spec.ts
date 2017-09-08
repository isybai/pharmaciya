import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentersComponent } from './renters.component';

describe('RentersComponent', () => {
  let component: RentersComponent;
  let fixture: ComponentFixture<RentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
