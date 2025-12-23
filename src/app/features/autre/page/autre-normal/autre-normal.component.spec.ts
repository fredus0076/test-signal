/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutreNormalComponent } from './autre-normal.component';

describe('AutreNormalComponent', () => {
  let component: AutreNormalComponent;
  let fixture: ComponentFixture<AutreNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutreNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
