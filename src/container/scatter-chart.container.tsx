import { AxisBottom, AxisLeft } from "@visx/axis";
import { GradientSteelPurple } from "@visx/gradient";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Circle } from "@visx/shape";
import React, { useMemo, useRef } from "react";
import { getXFromPointsRange, getYFromPointsRange } from "../lib/data-util";
import { genMockPoints } from "../lib/mock-data-util";

const pointsMock = genMockPoints(10);

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type ScatterChartContainerProps = {
  width: number;
  height: number;
};

function ScatterChartContainer({ width, height }: ScatterChartContainerProps) {
  const xMax = width - defaultMargin.left - defaultMargin.right;
  const yMax = height - defaultMargin.top - defaultMargin.bottom;

  const svgRef = useRef<SVGSVGElement>(null);

  const xAxisScale = scaleLinear<number>({
    domain: [
      Math.min(...pointsMock.map((point) => point[0])),
      Math.max(...pointsMock.map((point) => point[0])),
    ],
    range: [0, xMax],
    clamp: true,
  });
  const yAxisScale = scaleLinear<number>({
    domain: [
      Math.max(...pointsMock.map((point) => point[1])),
      Math.min(...pointsMock.map((point) => point[1])),
    ],
    range: [yMax, 0],
    clamp: true,
  });

  const xScale = useMemo(() => xAxisScale, [width]);
  const yScale = useMemo(() => yAxisScale, [height]);

  return (
    <div style={{ margin: "50px" }}>
      <svg width={width} height={height} ref={svgRef}>
        <rect width={width} height={height} rx={10} fill="white" />
        <Group
          pointerEvents="none"
          left={defaultMargin.left}
          top={defaultMargin.top}
        >
          <AxisBottom scale={xAxisScale} top={yMax} />
          <AxisLeft scale={yAxisScale} />
          {pointsMock.map((point, i) => (
            <Circle
              key={`point-${point[0]}-${i}`}
              className="dot"
              cx={xScale(getXFromPointsRange(point))}
              cy={yScale(getYFromPointsRange(point))}
              r={5}
              fill="purple"
            />
          ))}
        </Group>
      </svg>
    </div>
  );
}

export default ScatterChartContainer;
