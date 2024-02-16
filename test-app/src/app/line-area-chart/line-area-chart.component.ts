import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import DatalabelsPlugin  from 'chartjs-plugin-datalabels';
Chart.register([DatalabelsPlugin]);

@Component({
  selector: 'app-line-area-chart',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.css'],
})
export class LineAreaChartComponent implements OnInit, OnChanges {
    @Input() selectedYear!: string;
    public chart: any;
    public selectedMonth: string = 'January';

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.fetchChartData(this.selectedMonth); // Fetch data for the initial month
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedYear']) {
            this.fetchChartDataForYear(changes['selectedYear'].currentValue);
        }
    }

    fetchChartData(month: string) {
        this.http.get<any>(`http://localhost:5000/api/chart/${this.selectedYear}/${month}`).subscribe(
            (data) => {
                this.createChart(data);
            },
            (error) => {
                console.error('Error fetching chart data:', error);
            }
        );
    }

    fetchChartDataForYear(selectedYear: string) {
        this.http.get<any>(`http://localhost:5000/api/chart/${selectedYear}/${this.selectedMonth}`).subscribe(
            (data) => {
                this.createChart(data);
            },
            (error) => {
                console.error('Error fetching chart data:', error);
            }
        );
    }
    
    createChart(data: any) {
        if (this.chart) {
            this.chart.destroy(); // Destroy the existing chart if it exists
        }

        this.chart = new Chart('MyChart2', {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: data.datasets[0].label,
                        data: data.datasets[0].data,
                        backgroundColor: [
                            'rgba(66,133,244,0.9)',
                            'rgba(219,68,55,0.9)',
                        ],
                        borderColor: ['rgb(66,133,244)', 'rgb(219,68,55)'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                aspectRatio: 2,
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

    onMonthChange(event: Event) {
        const selectedMonth = (event.target as HTMLSelectElement).value;
        this.selectedMonth = selectedMonth;
        this.fetchChartData(this.selectedMonth); // Fetch and update data for the selected month

        if (this.chart) {
            this.chart.destroy(); // Destroy the existing chart if it exists
        }
    }
}
