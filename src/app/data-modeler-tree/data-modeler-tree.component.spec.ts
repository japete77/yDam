import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelerTreeComponent } from './data-modeler-tree.component';

describe('DataModelerTreeComponent', () => {
  let component: DataModelerTreeComponent;
  let fixture: ComponentFixture<DataModelerTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataModelerTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataModelerTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
