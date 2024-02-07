import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartComponent } from "./chart/chart.component";
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineAreaChartComponent } from "./line-area-chart/line-area-chart.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ChartComponent, LineChartComponent, LineAreaChartComponent]
})
export class AppComponent {
  title = 'test-app';
}
