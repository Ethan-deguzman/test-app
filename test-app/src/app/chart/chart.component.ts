import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() selectedYear!: string;
  public chart: any;
  public chartData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.fetchChartData(this.selectedYear);
      console.log(this.selectedYear, "in bar chart components");
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['selectedYear']) {
          this.fetchChartData(changes['selectedYear'].currentValue);
      }
  }

  fetchChartData(selectedYear: string) {
      this.http.get<any>(`http://localhost:5000/api/chart/${selectedYear}`).subscribe(
          (data) => {
              this.chartData = data;
              if (this.chart) {
                  this.chart.destroy(); // Destroy existing chart before reinitializing
              }
              this.createChart();
          },
          (error) => {
              console.error('Error fetching chart data:', error);
          }
      );
  }
  

  createChart() {
    console.log('Creating chart for year:', this.selectedYear);
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            label: 'Contractual Employees',
            data: this.chartData.datasets[1].data,
            backgroundColor: 'rgba(243,233,200,0.9)',
            borderColor: 'rgba(243,233,200,255)',
            borderWidth: 1,
            barThickness: 44
          },
          {
          label: 'Regular Employees',
          data: this.chartData.datasets[0].data,
          backgroundColor: 'rgba(11,83,148,0.9)',
          borderColor: 'rgba(11,83,148,1)',
          borderWidth: 1,
          barThickness: 44 
        }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            // Default color for all labels
            color: 'white',
            textStrokeColor: 'black', // Color of the text stroke
            textStrokeWidth: 2, // Width of the text stroke
            formatter: (value, ctx) => {
              if (ctx.datasetIndex === 0) { // Contractual employees dataset
                const contractualEmployees: any = ctx.chart.data.datasets[0].data[ctx.dataIndex];
                const totalEmployees = contractualEmployees + ctx.chart.data.datasets[1].data[ctx.dataIndex];
                const ratio = (contractualEmployees / totalEmployees) * 100;
                const formattedValue = `${ratio.toFixed(2)}%`;
            
                // Set color to white when the value is 100%
                const color = ratio === 100 ? 'white' : 'gray';
            
                return formattedValue;
              } else { // Regular employees dataset
                return '100';
              }
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
      }
    });
  }
  destroyChart() {
    if (this.chart) {
        this.chart.destroy(); // Destroy the existing chart if it exists
    }
}
}
