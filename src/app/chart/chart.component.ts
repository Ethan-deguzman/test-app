import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'; // corrected import

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'], // corrected property name
})
export class ChartComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        // values on X-Axis
        labels: ['2009', '2010', '2011', '2012'],
        datasets: [
          {
            label: 'Series A',
            data: ['5', '10', '35', '40'],
            backgroundColor: 'rgb(89, 180, 195)',
          },
          {
            label: 'Series B',
            data: ['15', '20', '25', '30', ],
            backgroundColor: 'pink',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          tooltip: {
            mode: 'index', // Show tooltips for all datasets at the same index
          },
        },
      },
    });
  }
  
  
}
