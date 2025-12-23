/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyAutreTestComponent } from './my-autre-test.component';

describe('MyAutreTestComponent', () => {
  let component: MyAutreTestComponent;
  let fixture: ComponentFixture<MyAutreTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAutreTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAutreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
