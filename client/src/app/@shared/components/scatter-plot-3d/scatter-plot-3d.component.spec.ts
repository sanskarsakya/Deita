/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScatterPlot-3dComponent } from './scatter-plot-3d.component';

describe('ScatterPlot-3dComponent', () => {
  let component: ScatterPlot-3dComponent;
  let fixture: ComponentFixture<ScatterPlot-3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterPlot-3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlot-3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
