public class ChartData
{
	public string[] ?Labels { get; set; }
	public ChartDataset[] ?Datasets { get; set; } 
}

public class ChartDataset
{
	public string ?Label { get; set; } 
	public int[] ?Data { get; set; } 
	
}
