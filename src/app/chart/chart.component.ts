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
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Sales',
            data: [467, 576, 572, 79, 92, 574, 573, 576],
            backgroundColor: 'rgb(33, 28, 106)',
          },
          {
            label: 'Profit',
            data: [542, 542, 536, 327, 17, 0, 538, 541],
            backgroundColor: 'rgb(116, 226, 145)',
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
