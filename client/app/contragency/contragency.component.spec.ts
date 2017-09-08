import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContragencyComponent } from './contragency.component';

describe('ContragencyComponent', () => {
  let component: ContragencyComponent;
  let fixture: ComponentFixture<ContragencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContragencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContragencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
