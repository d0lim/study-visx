import { genRandomNormalPoints } from "@visx/mock-data";

export const genMockPoints = (pointNumber: number) =>
  genRandomNormalPoints(pointNumber, 0.5).filter((_, i) => i < pointNumber);
