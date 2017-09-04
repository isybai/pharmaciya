import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpuComponent } from './lpu.component';

describe('LpuComponent', () => {
  let component: LpuComponent;
  let fixture: ComponentFixture<LpuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
