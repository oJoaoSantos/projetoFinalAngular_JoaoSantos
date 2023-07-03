import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomehighlightsComponent } from './homehighlights.component';

describe('HomehighlightsComponent', () => {
  let component: HomehighlightsComponent;
  let fixture: ComponentFixture<HomehighlightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomehighlightsComponent]
    });
    fixture = TestBed.createComponent(HomehighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
