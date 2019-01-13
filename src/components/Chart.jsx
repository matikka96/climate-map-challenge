import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import { XYPlot, LineSeries, VerticalGridLines, XAxis, YAxis } from "react-vis";
import "../App.css";

class Chart extends Component {
  state = {
    chartWidth: 0,
    chartHeight: 0,
    chartData: []
  };
  componentDidMount() {
    this.getDimensions();
    window.addEventListener("resize", this.getDimensions);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedLocationId !== this.props.selectedLocationId) {
      if (this.props.selectedLocationId) {
        this.parseData();
      }
    }
  }
  parseData = () => {
    let selectedData = this.props.observationLocations.filter(
      t => t.info.id === this.props.selectedLocationId
    );
    let xyData = [];
    for (let i = 0; i < selectedData[0].data.t.timeValuePairs.length; i++) {
      let e = selectedData[0].data.t.timeValuePairs[i];
      xyData.push({ x: e.time, y: e.value });
    }
    this.setState({ chartData: xyData });
  };
  getDimensions = () => {
    this.setState({
      chartWidth: window.innerWidth - 300,
      chartHeight: window.innerHeight / 2
    });
  };
  render() {
    const chartStyle = {
      top: "0",
      left: "300",
      position: "fixed"
    };
    return (
      <div
        className="Chart"
        style={
          this.props.selectedLocationId
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <button
          type="button"
          className="btn btn-secondary m-3"
          id="chart-button"
          onClick={this.props.resetSelectedLocation}
        >
          Sulje
        </button>
        <XYPlot
          xType="time"
          height={this.state.chartHeight}
          width={this.state.chartWidth}
          style={chartStyle}
        >
          <VerticalGridLines />
          <XAxis title="Datetime" />
          <YAxis title="Temperature °C " />
          <LineSeries data={this.state.chartData} color="blue" />
        </XYPlot>
      </div>
    );
  }
}

export default Chart;
