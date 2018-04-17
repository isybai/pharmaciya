import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpoComponent } from './rpo.component';

describe('RpoComponent', () => {
  let component: RpoComponent;
  let fixture: ComponentFixture<RpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
