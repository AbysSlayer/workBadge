import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeGenComponent } from './badge-gen.component';

describe('BadgeGenComponent', () => {
  let component: BadgeGenComponent;
  let fixture: ComponentFixture<BadgeGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
