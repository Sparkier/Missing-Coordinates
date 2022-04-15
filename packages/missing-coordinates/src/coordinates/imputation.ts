import type { AxisDescriptor, Coordinate, Data } from "../types";

export function imputeValueForAxis(
  data: Data,
  axis: AxisDescriptor,
  coordinate: Coordinate,
  imputationNeighbors: number,
  axes: AxisDescriptor[],
  includeCategorical = true
): number | string | undefined {
  const distances: Record<number, number> = {};
  const dataFinal = data.axes.find((a) => a.name === axis.name);
  if (dataFinal === undefined) {
    return;
  }
  for (const currentAxis of axes) {
    if (coordinate.values[currentAxis.name] !== null) {
      const dataAxis = data.axes.find((a) => a.name === currentAxis.name);
      const coordinateValue = coordinate.values[currentAxis.name];
      if (dataAxis !== undefined) {
        if (currentAxis.categorical) {
          if (includeCategorical) {
            updateDistancesCategorical(
              distances,
              dataAxis.data as (string | null)[],
              coordinateValue as string,
              dataFinal.data
            );
          }
        } else {
          updateDistancesNumerical(
            distances,
            dataAxis.data as (number | null)[],
            coordinateValue as number,
            dataFinal.data,
            currentAxis
          );
        }
      }
    }
  }
  if (Object.keys(distances).length > 0) {
    const distanceList = Object.keys(distances).map((key) => [
      parseInt(key),
      distances[parseInt(key)],
    ]);
    distanceList.sort((a, b) => a[1] - b[1]);
    const lowestDistances = distanceList.slice(0, imputationNeighbors);
    const neighbors = [];
    for (const neighbor of lowestDistances) {
      neighbors.push(dataFinal.data[neighbor[0]]);
    }
    if (axis.categorical) {
      return imputeValueForCategoricalAxis(neighbors as string[]);
    } else {
      return imputeValueForNumericalAxis(neighbors as number[]);
    }
  }
  return undefined;
}

function imputeValueForCategoricalAxis(neighbors: string[]): string {
  const counts: Record<string, number> = {};
  let mostFrequent = neighbors[0];
  for (const neighbor of neighbors) {
    counts[neighbor] = counts[neighbor] ? counts[neighbor] + 1 : 1;
    if (counts[mostFrequent] < counts[neighbor]) {
      mostFrequent = neighbor;
    }
  }
  return mostFrequent;
}

function imputeValueForNumericalAxis(neighbors: number[]): number {
  const sum = neighbors.reduce((a, b) => a + b, 0);
  return sum / neighbors.length;
}

function updateDistancesCategorical(
  distances: Record<number, number>,
  dataAxis: (string | null)[],
  coordinateValue: string,
  dataFinal: (string | number | null)[]
) {
  for (const index in dataAxis) {
    if (dataFinal[index] !== null) {
      if (dataAxis[index] !== coordinateValue) {
        distances[index] = distances[index] ? distances[index] + 1 : 1;
      } else {
        distances[index] = distances[index] ? distances[index] : 0;
      }
    }
  }
}

function updateDistancesNumerical(
  distances: Record<number, number>,
  dataAxis: (number | null)[],
  coordinateValue: number,
  dataFinal: (string | number | null)[],
  currentAxis: AxisDescriptor
) {
  if (currentAxis.extremes !== undefined) {
    const divergence = currentAxis.extremes.max - currentAxis.extremes.min;
    for (const index in dataAxis) {
      if (dataFinal[index] !== null) {
        const axisData = dataAxis[index];
        if (axisData !== null) {
          const distance = Math.abs(axisData - coordinateValue) / divergence;
          distances[index] = distances[index]
            ? distances[index] + distance
            : distance;
        } else {
          distances[index] = distances[index] ? distances[index] + 1 : 1;
        }
      }
    }
  }
}
