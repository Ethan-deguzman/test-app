import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import DatalabelsPlugin  from 'chartjs-plugin-datalabels';
Chart.register([DatalabelsPlugin]);

@Component({
  selector: 'app-donut-chart', 
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
})
export class DonutChartComponent implements OnInit {
  public chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDataAndCreateChart('January'); // Initial chart for January
  }

  onMonthChange(event: any) {
    const selectedMonth = event.target?.value; // Using optional chaining to handle null
    if (selectedMonth) {
      this.fetchDataAndCreateChart(selectedMonth);
    }
  }

  fetchDataAndCreateChart(selectedMonth: string) {
    const endpoint = selectedMonth === 'January' ? 'pieChartDataSetA' : 'pieChartDataSetB';
    this.http.get<any>(`http://localhost:5000/api/chart/${endpoint}`).subscribe(data => {
      this.createChart(data);
    });
  }

  createChart(chartData: any) {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart instance if exists
    }
    
    this.chart = new Chart('MyChart3', {
      type: 'doughnut', 
      data: {
        labels: chartData.labels, 
        datasets: [
          {
            label: '',
            data: chartData.data,
            backgroundColor: chartData.backgroundColors, 
            borderColor: chartData.backgroundColors.map((color: string) => color.replace('0.5', '1')), // Adjusting alpha value for border
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 1.5, 
        plugins: {
          tooltip: {
            mode: 'index',
          },
          datalabels: {
            formatter: (value: number, context: any) => {
                const dataset = context.chart.data.datasets[context.datasetIndex];
                const total = dataset.data.reduce(
                    (acc: number, data: number) => acc + data,
                    0
                );
                const percentage = ((value / total) * 100).toFixed(2) + '%';
                return percentage;
            },
            color: 'white',
            font: {
                weight: 'bold',
            },
        },
        },
      },
    });
  }
}