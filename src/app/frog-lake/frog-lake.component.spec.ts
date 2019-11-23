import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrogLakeComponent } from './frog-lake.component';

describe('FrogLakeComponent', () => {
  let component: FrogLakeComponent;
  let fixture: ComponentFixture<FrogLakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrogLakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrogLakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
