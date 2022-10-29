import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderoptiComponent } from './headeropti.component';

describe('HeaderoptiComponent', () => {
  let component: HeaderoptiComponent;
  let fixture: ComponentFixture<HeaderoptiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderoptiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderoptiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
