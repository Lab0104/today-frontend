import * as React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 0.1;
const MIN = 10;
const MAX = 100;

export default class ReactRange extends React.Component {
  state = { values: [100] };
  render() {
    return (
      <div>
        <Range
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => this.setState({ values })}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["#F01919", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "5px",
                  backgroundColor: isDragged ? "#F01919" : "#CCC",
                }}
              />
            </div>
          )}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>1km</p>
          <output style={{ margin: "16px 0" }} id="output">
            {(this.state.values[0] / 10).toFixed(1) + "km"}
          </output>
          <p>10km</p>
        </div>
      </div>
    );
  }
}
