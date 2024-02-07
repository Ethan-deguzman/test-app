import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'; // corrected import

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'], // corrected property name
})
export class LineChartComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart1', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['2009', '2010', '2011', '2012'],
        datasets: [
          {
            label: 'Series A',
            data: ['5', '10', '25', '30'],
            backgroundColor: 'rgb(89, 180, 195)',
            tension: 0.3, // Adjust the line tension for smoother curves
            borderCapStyle: 'round', // Rounded edges at the line ends
            borderJoinStyle: 'round'
          },
          {
            label: 'Series B',
            data: ['15', '20', '35', '40', ],
            backgroundColor: 'pink',
            tension: 0.3, // Adjust the line tension for smoother curves
            borderCapStyle: 'round', // Rounded edges at the line ends
            borderJoinStyle: 'round'
          },
        ],
      },
      options: {
        aspectRatio: 2.5, 
        scales: {
          y: {
            beginAtZero: true // Ensure the y-axis starts at zero
          }
        },
        plugins: {
          tooltip: {
            mode: 'index',
          },
        },
      },
    });
  }
}
