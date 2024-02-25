import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import DatalabelsPlugin  from 'chartjs-plugin-datalabels';
Chart.register([DatalabelsPlugin]);
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';


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
    this.fetchDataAndCreateChart('January', '2023'); // Initial chart for January 2023
}

onMonthChange(event: any) {
    const selectedMonth = event.target?.value;
    // Using optional chaining to handle null
    if (selectedMonth) {
        const selectedYear = (document.getElementById("yearDropdown") as HTMLSelectElement).value;
        this.fetchDataAndCreateChart(selectedMonth, selectedYear);
    }
}

onYearChange(event: any) {
    const selectedYear = event.target?.value;
    // Using optional chaining to handle null
    if (selectedYear) {
        const selectedMonth = (document.getElementById("monthDropdown") as HTMLSelectElement).value;
        this.fetchDataAndCreateChart(selectedMonth, selectedYear);
    }
}

fetchDataAndCreateChart(selectedMonth: string, selectedYear: string) {
  const month = selectedMonth.substr(0, 3); // Take the first three letters of the month
  const year = selectedYear;
  this.http.get<any>(`http://localhost:5000/api/chart/pieChartData?year=${year}&month=${month}`).pipe(
      catchError((error) => {
          let errorMessage = 'An error occurred while fetching data! Please try again later.';
          if (error.status === 500) {
              // The backend returned an unsuccessful response code.
              if (error.error && error.error.includes('does not match the sum')) {
                  errorMessage = `Invalid input! Please check your table for ${selectedMonth} ${selectedYear}.Total number of employees does not match the sum of regular and contractors.`;
              } else if (error.error && error.error.includes('was not in a correct')) {
                  errorMessage = `Invalid input! Please check your table for ${selectedMonth} ${selectedYear}.`;
              } else if (error.error && error.error.includes('Invalid data format for regular')) {
                errorMessage = `Invalid data input for regular or contractor employees for ${selectedMonth} ${selectedYear}.`;
              }else {
                  errorMessage = 'Internal server error occurred! Please contact support.';
              }
          } // Add more specific error handling as needed

          // Display a swal notification for the error
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: errorMessage,
              allowOutsideClick: false,
              showCancelButton: false,
              confirmButtonText: 'OK'
          }).then((result: { isConfirmed: any; }) => {
              if (result.isConfirmed) {
                  location.reload(); // Reload the page if the user confirms the error
              }
          });

          // Log the error to the console
          console.error('Error fetching data:', error);
          
          // Return an empty array to prevent the subscription from receiving an error
          return throwError('Failed to fetch data');
      })
  ).subscribe(data => {
      // Process the fetched data
      this.createChart(data);
      console.log('data fetched in monthly', selectedMonth, selectedYear, data);
  });
}





  createChart(data: any) {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart instance if exists
    }
    
    this.chart = new Chart('MyChart3', {
      type: 'doughnut', 
      data: {
        labels: data.labels, 
        datasets: [
          {
            label: '',
            data: data.data,
            backgroundColor: ['#4285f4','#db4437'], 
            borderColor: ['rgba(66, 133, 244, 0.8)', 'rgba(219, 68, 55, 0.8)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio: 2, 
        plugins: {
          tooltip: {
            mode: 'index',
          },
          legend: {
            display: true,
            position: 'bottom',
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