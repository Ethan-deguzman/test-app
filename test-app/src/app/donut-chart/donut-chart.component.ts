import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-donut-chart', 
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
      type: 'doughnut', 
      data: {
        labels: ['2009', '2010', '2011', '2012'], 
        datasets: [
          {
            label: 'Series A',
            data: ['10', '15', '9', '22'],
            backgroundColor: ['rgba(89, 180, 195, 0.5)', 'rgba(255, 192, 203, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'], 
            borderColor: ['rgb(89, 180, 195)', 'pink', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)'], 
            borderWidth: 1
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
