using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/chart")]
public class ChartController : ControllerBase
{
	[HttpGet]
	public ActionResult<ChartData> GetChartData()
	{
		var data = new ChartData
		{
			Labels = new string[] { "2009", "2010", "2011", "2012" },
			Datasets = new ChartDataset[]
			{
				new ChartDataset
				{
					Label = "Series A",
					Data = new int[] { 5, 10, 35, 40 }
					
				},
				new ChartDataset
				{
					Label = "Series B",
					Data = new int[] { 15, 20, 25, 30 }
					
                }
			}
		};

		return Ok(data);
	}
}
