import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-area-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.css'],
})
export class LineAreaChartComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart2', {
      type: 'line',
      data: {
        // values on X-Axis
        labels: ['2009', '2010', '2011', '2012'],
        datasets: [
          {
            label: 'Series A',
            data: ['10', '15', '9', '22'],
            
            backgroundColor: 'rgb(89, 180, 195, 0.5)', // Changed to RGBA to support transparency
            borderColor: 'rgb(89, 180, 195)',
            fill: true, // Fill area below the line
            tension: 0.3, // Adjust the line tension for smoother curves
            borderCapStyle: 'round', // Rounded edges at the line ends
            borderJoinStyle: 'round'
          },
          {
            label: 'Series B',
            data: ['13', '20', '12', '35'],
            backgroundColor: 'rgba(255, 192, 203, 0.5)', // Changed to RGBA to support transparency
            borderColor: 'pink',
            fill: true, // Fill area below the line
            tension: 0.3, // Adjust the line tension for smoother curves
            borderCapStyle: 'round', // Rounded edges at the line ends
            borderJoinStyle: 'round'
          },
        ],
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
