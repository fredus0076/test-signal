/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutreWithIdComponent } from './autre-with-id.component';

describe('AutreWithIdComponent', () => {
  let component: AutreWithIdComponent;
  let fixture: ComponentFixture<AutreWithIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutreWithIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
