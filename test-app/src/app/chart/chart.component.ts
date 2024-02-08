import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'; // corrected import
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'], // corrected property name
})
export class ChartComponent implements OnInit {
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
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets.map((dataset: any) => ({
          label: dataset.label,
          data: dataset.data.map((value: any) => parseFloat(value)), // Ensure data is in number format
          
        })),
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
