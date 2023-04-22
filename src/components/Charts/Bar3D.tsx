import React from "react"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Chart from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)
type ChartComponentProps = {
  data: object[]
}
const ChartComponent = ({ data }: ChartComponentProps) => {
  const chartConfigs = {
    type: "bar3d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Most Forked",
        theme: "fusion",
        yAxisName: "Forks",
        xAxisName: "Repos",
        yAxisNameFontSize: "16px",
        xAxisNameFontSize: "16px",
        paletteColors: "#3C486B,F0F0F0,F9D949,F45050,002B5B,408E91,2E3840",
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default ChartComponent
