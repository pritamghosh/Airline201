import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsmComponent } from './msm.component';

describe('MsmComponent', () => {
  let component: MsmComponent;
  let fixture: ComponentFixture<MsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
