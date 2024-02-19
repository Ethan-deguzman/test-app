import { Component, ViewChild } from '@angular/core';

import { ChartComponent } from "../chart/chart.component";
import { DonutChartComponent } from '../donut-chart/donut-chart.component';



@Component({
    selector: 'app-charts-selector',
    standalone: true,
    templateUrl: './charts-selector.component.html',
    styleUrl: './charts-selector.component.css',
    imports: [ ChartComponent, DonutChartComponent]
})
export class ChartsSelectorComponent {
//   @ViewChild(ChartComponent) chartComponent!: ChartComponent; // ViewChild to access ChartComponent methods

//   public selectedYear: string = '2023'; // Default selected year

//   onYearChange(event: Event) {
//       const selectedYear = (event.target as HTMLSelectElement).value;
//       this.selectedYear = selectedYear;
//       console.log('Selected year:', this.selectedYear);
      
//       if (this.chartComponent) {
//           this.chartComponent.destroyChart(); // Call destroyChart method in ChartComponent
//       }
//   }
}