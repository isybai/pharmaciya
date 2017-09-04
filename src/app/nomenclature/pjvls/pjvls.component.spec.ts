import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjvlsComponent } from './pjvls.component';

describe('PjvlsComponent', () => {
  let component: PjvlsComponent;
  let fixture: ComponentFixture<PjvlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjvlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjvlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
