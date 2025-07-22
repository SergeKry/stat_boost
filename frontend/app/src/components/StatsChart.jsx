import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { line as d3Line, curveCatmullRom } from "d3-shape";

const LineBetweenPoints =
  (dataForLines) =>
  ({ xScale, yScale }) => {
    const scaledPoints = dataForLines.map((d) => ({
      x: xScale(d.x),
      y: yScale(d.y),
    }));

    const lineGenerator = d3Line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveCatmullRom);

    const path = lineGenerator(scaledPoints);

    return <path d={path} fill="none" stroke="blue" strokeWidth={2} />;
  };

const StatsChart = ({ statsChartData }) => {
  const lineLayer = LineBetweenPoints(statsChartData[0].data);

  return (
    <ResponsiveScatterPlot
      data={statsChartData}
      margin={{ top: 10, right: 10, bottom: 50, left: 70 }}
      enableGridX={false}
      xScale={{ type: "linear", min: "auto", max: "auto" }}
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      axisBottom={{ legend: "battles", legendOffset: 46 }}
      axisLeft={{ legend: "WN8", legendOffset: -60 }}
      colors={{ scheme: "category10" }}
      nodeSize={7}
      layers={["grid", "axes", "nodes", lineLayer, "mesh"]}
    />
  );
};

export default StatsChart;
