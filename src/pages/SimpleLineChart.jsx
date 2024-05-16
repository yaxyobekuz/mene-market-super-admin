import React from "react";
import { ResponsiveBump } from "@nivo/bump";

const SimpleLineChart = ({ data }) => (
  <div style={{ width: "100%", height: "100%" }}>
    <ResponsiveBump
      data={data}
      colors={{ scheme: "paired" }}
      // line
      lineWidth={3}
      activeLineWidth={4}
      inactiveLineWidth={3}
      inactiveOpacity={0.3}
      // point
      pointSize={6}
      activePointSize={12}
      inactivePointSize={0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={6}
      activePointBorderWidth={3}
      pointBorderColor={{ from: "serie.color" }}
      // padding
      xOuterPadding={0}
      // inset
      axisLeft
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickRotation: -90,
      }}
      margin={{ top: 40, bottom: 100, right: 80, left: 60 }}
    />
  </div>
);

export default SimpleLineChart;
