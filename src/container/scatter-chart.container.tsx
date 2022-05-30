import { GradientSteelPurple } from "@visx/gradient";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Circle } from "@visx/shape";
import React, { useMemo, useRef } from "react";
import { getXFromPointsRange, getYFromPointsRange } from "../lib/data-util";
import { genMockPoints } from "../lib/mock-data-util";

const pointsMock = genMockPoints(10);

export type ScatterChartContainerProps = {
  width: number;
  height: number;
};

function ScatterChartContainer({ width, height }: ScatterChartContainerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [1.3, 2.2],
        range: [0, width],
        clamp: true,
      }),
    [width]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0.75, 1.6],
        range: [height, 0],
        clamp: true,
      }),
    [height]
  );

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}>
        <GradientSteelPurple id="dots-purple" />
        <rect width={width} height={height} rx={14} fill="url(#dots-purple)" />
        <Group pointerEvents="none">
          {pointsMock.map((point, i) => (
            <Circle
              key={`point-${point[0]}-${i}`}
              className="dot"
              cx={xScale(getXFromPointsRange(point))}
              cy={yScale(getYFromPointsRange(point))}
              r={5}
              fill="white"
            />
          ))}
        </Group>
      </svg>
    </div>
  );
}

export default ScatterChartContainer;
