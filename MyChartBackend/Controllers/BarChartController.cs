using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;

namespace WorkforceAPI.Controllers
{
    [Route("api/chart")]
    [ApiController]
    public class BarChartController : ControllerBase
    {
        private string csvFilePath = @"./data/MonthlyData.csv";

        [HttpGet("barChartData")]
        public IActionResult GetBarChartData(string year)
        {
            try
            {
                var barChartData = GetBarChartDataForYear(year);
                return Ok(barChartData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private object GetBarChartDataForYear(string year)
        {
            var lines = System.IO.File.ReadAllLines(csvFilePath).Skip(1); // Skip header
            var data = new List<object>();

            var monthNames = CultureInfo.CurrentCulture.DateTimeFormat.AbbreviatedMonthNames.Take(12).ToList();
            var monthIndices = Enumerable.Range(1, 12).ToDictionary(i => monthNames[i - 1]);

            foreach (var monthName in monthNames)
            {
                var monthData = lines
                    .Where(line => line.Split(',')[0].Trim() == year && line.Split(',')[1].Trim().StartsWith(monthName)) // Filter by year and month
                    .Select(line =>
                    {
                        var parts = line.Split(',');
                        if (!int.TryParse(parts[3], out int regularEmployees) || !int.TryParse(parts[4], out int contractors))
                        {
                            throw new Exception("Invalid data format for regular or contractor employees.");
                        }
                        int totalEmployees = regularEmployees + contractors;

                        if (totalEmployees != int.Parse(parts[2]))
                        {
                            throw new Exception("Total number of employees does not match the sum of regular and contractors.");
                        }

                        return new[] { regularEmployees, contractors }; // Regular and Contractual Employees data
                    })
                    .FirstOrDefault();

                if (monthData != null)
                {
                    data.Add(new { month = monthName, data = monthData }); // Add data for the month
                }
                else
                {
                    data.Add(new { month = monthName, data = new[] { 0, 0 } }); // Add [0, 0] if no data found for the month
                }
            }

            return data;
        }
    }
}
