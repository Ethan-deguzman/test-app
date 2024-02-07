import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-donut-chart', // Make sure the selector matches what you're using in the template
  standalone: true,
  imports: [],
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
})
export class DonutChartComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart3', {
      type: 'doughnut', // Change chart type to 'doughnut'
      data: {
        labels: ['2009', '2010', '2011', '2012'], // Labels for each section
        datasets: [
          {
            label: 'Series A',
            data: ['10', '15', '9', '22'],
            backgroundColor: ['rgba(89, 180, 195, 0.5)', 'rgba(255, 192, 203, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'], // Background colors for the sections
            borderColor: ['rgb(89, 180, 195)', 'pink', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)'], // Border colors for the sections
            borderWidth: 1 // Border width
          }
        ]
      },
      options: {
        aspectRatio: 2.5, 
        plugins: {
          tooltip: {
            mode: 'index',
          },
        },
      },
    });
  }
}
