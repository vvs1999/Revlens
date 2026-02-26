import { ChartPreview } from "./chart-preview"

export const reports = [
  {
    id: 1,
    title: "Monthly Sales Trends",
    description: "Analyze sales performance over the past months.",
    chart: <ChartPreview type="line" />,
  },
  {
    id: 2,
    title: "Top 5 Best-Selling Products",
    description: "Identify the top-performing products in your inventory.",
    chart: <ChartPreview type="bar" />,
  },
  {
    id: 3,
    title: "Inventory Waste Analysis",
    description: "Track and minimize waste to improve efficiency.",
    chart: <ChartPreview type="pie" />,
  },
  {
    id: 4,
    title: "Revenue Growth YoY",
    description: "Compare revenue growth year over year.",
    chart: (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="text-5xl font-bold text-primary flex items-center">
          28%
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-green-500 ml-2"
          >
            <path
              fillRule="evenodd"
              d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    ),
  },
]

export const AnimatedReports = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {reports.map((report) => (
        <div key={report.id} className="flex flex-col rounded-md border p-2 shadow-sm">
          <div className="font-semibold">{report.title}</div>
          <div className="text-sm text-muted-foreground">{report.description}</div>
          <div className="h-20 w-full">{report.chart}</div>
        </div>
      ))}
    </div>
  )
}
