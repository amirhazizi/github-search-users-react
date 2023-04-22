import React from "react"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Chart from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy"
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)
type ChartComponentProps = {
  data: object[]
}
const ChartComponent = ({ data }: ChartComponentProps) => {
  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars Per Language",
        theme: "candy",
        decimals: 0,
        showPercentValues: 0,
        doughnutRadius: "45%",
        paletteColors: "84D2C5,E4C988,ECECEC,FF6E31,FFEBB7,BAD7E9",
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default ChartComponent
