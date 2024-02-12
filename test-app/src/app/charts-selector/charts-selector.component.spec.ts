import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsSelectorComponent } from './charts-selector.component';

describe('ChartsSelectorComponent', () => {
  let component: ChartsSelectorComponent;
  let fixture: ComponentFixture<ChartsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
