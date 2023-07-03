import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesliderComponent } from './homeslider.component';

describe('HomesliderComponent', () => {
  let component: HomesliderComponent;
  let fixture: ComponentFixture<HomesliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomesliderComponent]
    });
    fixture = TestBed.createComponent(HomesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
