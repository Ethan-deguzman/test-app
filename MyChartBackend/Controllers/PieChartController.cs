using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;

namespace WorkforceAPI.Controllers
{
    [Route("api/chart")]
    [ApiController]
    public class PieChartController : ControllerBase
    {
        private string csvFilePath = @"./data/MonthlyData.csv";

        [HttpGet("pieChartData")]
        public IActionResult GetPieChartData(string year, string month)
        {
            try
            {
                var pieChartData = GetPieChartDataForYearMonth(year, month);
                return Ok(pieChartData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private object GetPieChartDataForYearMonth(string year, string month)
        {
            var lines = System.IO.File.ReadAllLines(csvFilePath);
            var data = lines.Skip(1) // Skip header
                            .Select(line => line.Split(',')) // Split each line by comma
                            .Where(parts => parts.Length >= 5 && parts[0].Trim() == year && parts[1].Trim() == month) // Filter by year and month
                            .Select(parts =>
                    {
                        if (!int.TryParse(parts[3], out int regularEmployees) || !int.TryParse(parts[4], out int contractors))
                        {
                            throw new Exception("Invalid data format for regular or contractor employees.");
                        }
                        int totalEmployees = regularEmployees + contractors;

                        if (totalEmployees != int.Parse(parts[2]))
                        {
                            throw new Exception("Total number of employees does not match the sum of regular and contractors.");
                        }

                        return new
                        {
                            labels = new[] { "Regular Employees", "Contractors" },
                            data = new[] { regularEmployees, contractors }, // Regular and Contractual Employees data
                                                                            // backgroundColors = new[] { "#4285f4", "#db4437" },
                        };
                    })
                            .FirstOrDefault();

            if (data == null)
            {
                throw new Exception("Data not found for the specified year and month.");
            }

            return data;
        }

    }
}
