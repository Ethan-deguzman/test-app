using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace MychartData // Update with your actual namespace
{
    [ApiController]
    [Route("api/chart")]
    public class ChartController : ControllerBase
    {
        private readonly string[] months = new string[]
        {
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        };

        private readonly Dictionary<int, int[]> totalEmployeesByYear = new Dictionary<int, int[]>
    {
        { 2023, new int[] { 220, 212, 230, 231, 234, 220, 230, 230, 230, 230, 230, 230 } },
        { 2024, new int[] {  240, 240, 240, 250, 250, 245,
            245, 248, 248, 240, 260, 260 } }
    };

        private readonly Dictionary<int, int[]> regularEmployeesByYear = new Dictionary<int, int[]>
    {
        { 2023, new int[] { 176, 170, 184, 185, 187, 176, 184, 184, 184, 184, 184, 184 } },
        { 2024, new int[] {   192, 192, 192, 200, 200, 196,
            196, 198, 198, 192, 208, 208 } }
    };

        [HttpGet("{year}/{month}")]
        public ActionResult<ChartData> GetChartData(int year, string month)
        {
            if (!totalEmployeesByYear.ContainsKey(year))
                return BadRequest("Invalid year.");

            var index = Array.IndexOf(months, month);
            if (index == -1)
                return BadRequest("Invalid month.");

            var totalEmployees = totalEmployeesByYear[year];
            var regularEmployees = regularEmployeesByYear[year];

            var contractualEmployees = totalEmployees[index] - regularEmployees[index];

            var data = new ChartData
            {
                Labels = new string[] { "Regular Employees", "Contractual Employees" },
                Datasets = new ChartDataset[]
                {
                new ChartDataset
                {
                    Label = "Employees",
                    Data = new int[] { regularEmployees[index], contractualEmployees }
                }
                }
            };

            return Ok(data);
        }

        [HttpGet("annual/{year}")]
        public ActionResult<ChartData> GetAnnualChartData(int year)
        {
            if (!totalEmployeesByYear.ContainsKey(year))
                return BadRequest("Invalid year.");

            var totalEmployees = totalEmployeesByYear[year];
            var regularEmployees = regularEmployeesByYear[year];

            var totalRegularEmployees = regularEmployees.Sum();
            var totalContractualEmployees = totalEmployees.Sum() - totalRegularEmployees;

            // Aggregate data for all 12 months
            var regularEmployeesData = regularEmployees.Select((value, index) => new { Month = months[index], Value = value }).ToArray();
            var contractualEmployeesData = regularEmployeesData.Select((data, index) => new { Month = data.Month, Value = totalEmployees[index] - data.Value }).ToArray();

            var data = new ChartData
            {
                Labels = months,
                Datasets = new ChartDataset[]
                {
                new ChartDataset
                {
                    Label = "Regular Employees",
                    Data = regularEmployeesData.Select(data => data.Value).ToArray()
                },
                new ChartDataset
                {
                    Label = "Contractual Employees",
                    Data = contractualEmployeesData.Select(data => data.Value).ToArray()
                }
                }
            };

            return Ok(data);
        }
    }
}