import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-line-area-chart',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.css'],
})
export class LineAreaChartComponent implements OnInit {
  public chart: any;
  public chartData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData() {
    this.http.get<any>('http://localhost:5000/api/chart').subscribe(
      (data) => {
        this.chartData = data;
        this.createChart();
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }

  createChart() {
    this.chart = new Chart('MyChart2', {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets.map((dataset: any, index: number) => ({
          label: dataset.label,
          data: dataset.data.map((value: any) => parseFloat(value)),
          backgroundColor: index === 0 ? 'rgba(89, 180, 195, 0.5)' : 'rgba(255, 99, 132, 0.5)',
          borderColor: index === 0 ? 'rgb(89, 180, 195)' : 'rgb(255, 99, 132)',
          fill: true,
          tension: 0.3,
          borderCapStyle: 'round',
          borderJoinStyle: 'round'
        })),
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true
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
