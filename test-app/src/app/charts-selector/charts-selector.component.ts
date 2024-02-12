import { Component, ViewChild } from '@angular/core';
import { LineAreaChartComponent } from "../line-area-chart/line-area-chart.component";
import { ChartComponent } from "../chart/chart.component";



@Component({
    selector: 'app-charts-selector',
    standalone: true,
    templateUrl: './charts-selector.component.html',
    styleUrl: './charts-selector.component.css',
    imports: [LineAreaChartComponent, ChartComponent]
})
export class ChartsSelectorComponent {
  @ViewChild(ChartComponent) chartComponent!: ChartComponent; // ViewChild to access ChartComponent methods

  public selectedYear: string = '2023'; // Default selected year

  onYearChange(event: Event) {
      const selectedYear = (event.target as HTMLSelectElement).value;
      this.selectedYear = selectedYear;
      console.log('Selected year:', this.selectedYear);
      
      if (this.chartComponent) {
          this.chartComponent.destroyChart(); // Call destroyChart method in ChartComponent
      }
  }
}