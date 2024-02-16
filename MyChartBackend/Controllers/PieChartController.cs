using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WorkforceAPI.Controllers
{
    [Route("api/chart")]
    [ApiController]
    public class PieChartController : ControllerBase
    {
        private string csvFilePath = @"./data/piecharttable.csv";
        [HttpGet("pieChartDataSetA")]
        public IActionResult GetPieChartDataA()
        {
            try
            {
                var pieChartDataA = GetPieChartData("Data Set A");
                return Ok(pieChartDataA);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("pieChartDataSetB")]
        public IActionResult GetPieChartDataB()
        {
            try
            {
                var pieChartDataB = GetPieChartData("Data Set B");
                return Ok(pieChartDataB);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private object GetPieChartData(string dataSet)
        {
            var lines = System.IO.File.ReadAllLines(csvFilePath);
            var data = lines.Skip(1) // Skip header
                            .Select(line => line.Split(',')) // Split each line by comma
                            .Where(parts => parts.Length >= 7 && parts[0].Trim() == dataSet) // Filter by dataset name
                            .Select(parts => new
                            {
                                labels = new List<string> { "Regular Employees", "Contractors" },
                                data = new List<int> { int.Parse(parts[4]), int.Parse(parts[5]) }, // Regular and Contractual Employees data
                                backgroundColors = new List<string> { "#4285f4", "#db4437" },
                            })
                            .FirstOrDefault();

            if (data == null)
            {
                throw new Exception("Data not found for the specified dataset.");
            }

            return data;
        }
    }
}
