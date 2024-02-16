using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WorkforceAPI.Controllers
{
    [Route("api/chart")]
    [ApiController]
    public class BarChartController : ControllerBase
    {
        private string csvFilePath = @"./data/barcharttable.csv";

        [HttpGet("barChartDataSetA")]
        public IActionResult GetBarChartDataA()
        {
            try
            {
                var barChartDataA = GetBarChartData("Data set A", 2024);
                return Ok(barChartDataA);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("barChartDataSetB")]
        public IActionResult GetBarChartDataB()
        {
            try
            {
                var barChartDataB = GetBarChartData("Data set B", 2023);
                return Ok(barChartDataB);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private object GetBarChartData(string dataSet, int year)
        {
            var lines = System.IO.File.ReadAllLines(csvFilePath);
            var data = lines
                .Skip(1) // Skip the header line
                .Where(line => line.StartsWith(dataSet) && line.Contains($"{year} Total Employees")) // Filter by dataset name and year
                .Select(line => line.Split(',')) // Split each line by comma to create an array of values representing each column
                .FirstOrDefault();

            if (data == null)
            {
                throw new Exception("Data not found for the specified dataset and year.");
            }
            Console.WriteLine(string.Join(", ", data));
            // Find the indices of relevant columns
            var totalEmployeesIndex = Array.IndexOf(data, $"{year} Total Employees");
            var regularEmployeesIndex = Array.IndexOf(data, $"{year} Regular Employees");
            var contractorsIndex = Array.IndexOf(data, $"{year} Contractors");

            return new
            {
                labels = new List<string> { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" },
                datasets = new List<object>
        {
            new
            {
                label = "Total Employees",
                data = data.Skip(totalEmployeesIndex + 2).Take(12).Select(int.Parse).ToList(),
                backgroundColor = "#4285f4"
            },
           
            new
            {
                label = "Contractors",
                data = data.Skip(contractorsIndex + 2).Take(12).Select(int.Parse).ToList(),
                backgroundColor = "rgba(243,233,200,0.9)"
            },
             new
            {
                label = "Regular Employees",
                data = data.Skip(regularEmployeesIndex + 2).Take(12).Select(int.Parse).ToList(),
                backgroundColor = "rgba(11,83,148,0.9)"
            }
        }
            };
        }


    }
}
