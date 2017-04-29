import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigToolbarComponent } from './config-toolbar.component';

describe('ConfigToolbarComponent', () => {
  let component: ConfigToolbarComponent;
  let fixture: ComponentFixture<ConfigToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
