import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandbookComponent } from './handbook.component';

describe('HandbookComponent', () => {
  let component: HandbookComponent;
  let fixture: ComponentFixture<HandbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
