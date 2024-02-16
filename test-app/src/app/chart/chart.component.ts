import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  public chart: any;
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDataAndCreateChart('2023'); // Initial chart for January
  }

  onYearChange(event: any) {
    const selectedYear = event.target?.value; // Using optional chaining to handle null
    if (selectedYear) {
      this.fetchDataAndCreateChart(selectedYear);
    }
  }


  fetchDataAndCreateChart(selectedYear: string) {
    const endpoint = selectedYear === '2023' ? 'barChartDataSetA' : 'barChartDataSetB';
    this.http.get<any>(`http://localhost:5000/api/chart/${endpoint}`).subscribe(data => {
      this.createChart(data);
      console.log('data fetched:',data)
    });
  }
  

 
  createChart(chartData: any) {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart instance if exists
    }
  
    // Filter out the "Total Employees" dataset
    const filteredDatasets = chartData.datasets.filter((dataset: any) => dataset.label !== "Total Employees");
  
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: filteredDatasets.map((dataset: any) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.backgroundColor.replace('0.5', '1'), // Adjusting alpha value for border
          borderWidth: 1,
          barThickness: 44 
        }))
      },
      // Inside the options object of createChart method
options: {
  aspectRatio: 1.5,
  plugins: {
    tooltip: {
      mode: 'index',
    },
    datalabels: {
      formatter: (value: number, context: any) => {
        const totalEmployees = chartData.datasets[0].data[context.dataIndex]; // Total Employees
        const contractors = value; // Contractors
        const percentage = ((contractors / totalEmployees) * 100).toFixed(2) + '%';

        return percentage;
      },
      color: 'white',
      font: {
        weight: 'bold',
      },
    },
  },
  scales: {
    y: {
      stacked: true
    },
    x: {
      stacked: true
    }
  }
},

      
    });
  }
  
  
}
