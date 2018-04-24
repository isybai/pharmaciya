import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekvisitComponent } from './rekvisit.component';

describe('RekvisitComponent', () => {
  let component: RekvisitComponent;
  let fixture: ComponentFixture<RekvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
