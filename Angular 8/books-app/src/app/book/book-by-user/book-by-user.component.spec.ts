/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookByUserComponent } from './book-by-user.component';

describe('BookByUserComponent', () => {
  let component: BookByUserComponent;
  let fixture: ComponentFixture<BookByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
