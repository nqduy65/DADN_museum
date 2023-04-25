// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChartHumiDataThunk,
  getChartTempDataThunk,
} from "../../pages/DashBroad/dashBroadSlice";
import { selectdataChart } from "../../pages/DashBroad/selectors";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const data = [
  {
    id: "japan",
    color: "hsl(250, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 291,
      },
      {
        x: "helicopter",
        y: 105,
      },
      {
        x: "boat",
        y: 265,
      },
      {
        x: "train",
        y: 297,
      },
      {
        x: "subway",
        y: 213,
      },
      {
        x: "bus",
        y: 300,
      },
      {
        x: "car",
        y: 84,
      },
      {
        x: "moto",
        y: 35,
      },
      {
        x: "bicycle",
        y: 149,
      },
      {
        x: "horse",
        y: 248,
      },
      {
        x: "skateboard",
        y: 179,
      },
      {
        x: "others",
        y: 198,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(153, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 277,
      },
      {
        x: "helicopter",
        y: 35,
      },
      {
        x: "boat",
        y: 111,
      },
      {
        x: "train",
        y: 74,
      },
      {
        x: "subway",
        y: 131,
      },
      {
        x: "bus",
        y: 269,
      },
      {
        x: "car",
        y: 214,
      },
      {
        x: "moto",
        y: 13,
      },
      {
        x: "bicycle",
        y: 63,
      },
      {
        x: "horse",
        y: 93,
      },
      {
        x: "skateboard",
        y: 12,
      },
      {
        x: "others",
        y: 188,
      },
    ],
  },
];
const MyResponsiveLine = ({ value }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChartTempDataThunk());
    dispatch(getChartHumiDataThunk());
    setInterval(() => {
      dispatch(getChartTempDataThunk());
      dispatch(getChartHumiDataThunk());
    }, 3600 * 60 * 5);
  }, []);
  const data = useSelector(selectdataChart);
  return (
    <ResponsiveLine
      data={
        value == "3" ? data.data : value == 1 ? [data.data[0]] : [data.data[1]]
      }
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "hour",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "value",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "category10" }}
      lineWidth={1}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-1}
      enableArea={true}
      areaBlendMode="hard-light"
      areaOpacity={0.05}
      useMesh={true}
      legends={[]}
    />
  );
};
export default MyResponsiveLine;
