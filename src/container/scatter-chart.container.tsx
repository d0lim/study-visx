import { AxisBottom, AxisLeft } from "@visx/axis";
import localPoint from "@visx/event/lib/localPointGeneric";
import { GradientSteelPurple } from "@visx/gradient";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Circle } from "@visx/shape";
import { Tooltip, useTooltip } from "@visx/tooltip";
import React, { useCallback, useMemo, useRef } from "react";
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

  let tooltipTimeout: number;

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<number[]>({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
    tooltipData: [0, 0, 0],
  });

  const handleMouseOver = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      if (!svgRef.current) return;

      const currentPoint = localPoint(svgRef.current, event);

      console.log(currentPoint);

      if (!currentPoint) return;
      else {
        showTooltip({
          tooltipLeft: xScale(currentPoint.x),
          tooltipTop: yScale(currentPoint.y),
          tooltipData: [currentPoint.x, currentPoint.y, 0],
        });
      }
    },
    [xScale, yScale, showTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip();
    }, 300);
  }, [hideTooltip]);

  return (
    <div style={{ margin: "50px" }}>
      <svg width={width} height={height} ref={svgRef}>
        <rect width={width} height={height} rx={10} fill="white" />
        <Group left={defaultMargin.left} top={defaultMargin.top}>
          <AxisBottom scale={xAxisScale} top={yMax} />
          <AxisLeft scale={yAxisScale} />
          {pointsMock.map((point, i) => (
            <Circle
              key={`point-${point[0]}-${i}`}
              className="dot"
              cx={xScale(getXFromPointsRange(point))}
              cy={yScale(getYFromPointsRange(point))}
              r={5} // 여기가 점 크기이다
              fill="purple"
              onMouseMove={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleMouseOver}
              onTouchEnd={handleMouseLeave}
            />
          ))}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <Tooltip left={tooltipLeft + 10} top={tooltipTop + 10}>
          <div>
            <strong>x:</strong> {tooltipData[0]}
          </div>
          <div>
            <strong>y:</strong> {tooltipData[1]}
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export default ScatterChartContainer;
