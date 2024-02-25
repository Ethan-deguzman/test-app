import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import DatalabelsPlugin  from 'chartjs-plugin-datalabels';
Chart.register([DatalabelsPlugin]);
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    this.fetchDataAndCreateChart('2023'); // Initial chart for January 2023
}


onYearChange(event: any) {
    const selectedYear = event.target?.value;
    // Using optional chaining to handle null
    if (selectedYear) {
       
        this.fetchDataAndCreateChart(selectedYear);
    }
}



fetchDataAndCreateChart(selectedYear: string) {
  const year = selectedYear;
  this.http.get<any>(`http://localhost:5000/api/chart/barChartData?year=${year}`).pipe(
      catchError((error) => {
          let errorMessage = 'An error occurred while fetching data! Please try again later.';
          if (error.status === 500) {
            console.log(error.error)
              // The backend returned an unsuccessful response code.
              if (error.error && error.error.includes('does not match the sum')) {
                  errorMessage = `Invalid input! Please check your table for the year ${selectedYear}.Total number of employees does not match the sum of regular and contractors.`;
              } else if (error.error && error.error.includes('was not in a correct')) {
                errorMessage = `Invalid input! Please check your table for the year ${selectedYear}.`;
            }else if (error.error && error.error.includes('Invalid data format for regular')) {
              errorMessage = `Invalid data input for regular or contractor employees for the year ${selectedYear}.`;
          } else {
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
        }).then((result) => {
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
      console.log('data fetched in annually', selectedYear, data);
  });
}


createChart(data: any) {
  if (this.chart) {
    this.chart.destroy(); // Destroy previous chart instance if exists
  }

  this.chart = new Chart('MyChart', {
    type: 'bar',
    data: {
      labels: data.map((item: any) => item.month), // Extract month names as labels
      datasets: [
        {
          label: 'Contractors',
          data: data.map((item: any) => item.data[1]), // Extract contractors data
          backgroundColor: 'rgba(200, 200, 64, 0.5)', // Set background color for contractors
          borderColor: 'rgb(200, 200, 64)', // Set border color for contractors
          borderWidth: 1,
          barThickness: 44,
          stack: 'stack',
        },
        {
          label: 'Regular Employees',
          data: data.map((item: any) => item.data[0]), // Extract regular employees data
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Set background color for regular employees
          borderColor: 'rgb(54, 162, 235)', // Set border color for regular employees
          borderWidth: 1,
          barThickness: 44,
          stack: 'stack',
        },
      ],
    },
    options: {
      aspectRatio: 1.5,
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
            const datasetIndex = context.datasetIndex === 0 ? 1 : 0; // Swap the dataset indices
            const totalEmployees = data[context.dataIndex].data.reduce(
              (acc: number, curr: number) => acc + curr,
              0
            ); // Total Employees
            const employees = data[context.dataIndex].data[datasetIndex]; // Regular Employees or Contractors
            const percentage = ((employees / totalEmployees) * 100).toFixed(2) + '%';

            return percentage;
          },
          color: 'white',
          font: {
            weight: 'bold',
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Number of Employees',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Month',
          },
        },
      },
    },
  });
}


}