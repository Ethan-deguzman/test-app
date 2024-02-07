import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'; // corrected import
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [HttpClientModule], // Import here if standalone
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'], // corrected property name
})
export class LineChartComponent implements OnInit {
  public chart: any;
  public chartData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData() {
    this.http.get<any>('http://localhost:5067/api/chart').subscribe(
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
    this.chart = new Chart('MyChart1', {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets.map((dataset: any) => ({
          label: dataset.label,
          data: dataset.data.map((value: any) => parseFloat(value)), // Ensure data is in number format
          backgroundColor: dataset.backgroundColor,
          tension: 0.3,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
        })),
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
          },
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
