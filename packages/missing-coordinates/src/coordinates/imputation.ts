import type { AxisDescriptor, Coordinate, Data } from "../types";

/**
 * Impute a missing value for a given coordinate and axis.
 *
 * @param data complete dataset we are visualizing.
 * @param axis axis for which we are imputing a value.
 * @param coordinate coordinate for which we are imputing a value.
 * @param imputationNeighbors number of neighbors to consider for imputation.
 * @param axes informaion about all axes in the dataset.
 * @param includeCategorical whether to include categorical axis when imputing.
 * @returns imputed value for the coordinate and axis.
 */
export function imputeValueForAxis(
  data: Data,
  axis: AxisDescriptor,
  coordinate: Coordinate,
  imputationNeighbors: number,
  axes: AxisDescriptor[],
  includeCategorical = true
): number | string | undefined {
  // Holds the distances of all coordinates to the current coordinate.
  const distances: Record<number, number> = {};
  // Get the data for the target axis of the imputation.
  const dataTarget = data.axes.find((a) => a.name === axis.name);
  if (dataTarget === undefined) {
    return;
  }
  // Iterate over all axes to find neighbors of the currently requested
  // coordinate.
  for (const currentAxis of axes) {
    if (coordinate.values[currentAxis.name] !== null) {
      // Get the according axis data and the value of the coordinate for this
      // axis.
      const dataAxis = data.axes.find((a) => a.name === currentAxis.name);
      const coordinateValue = coordinate.values[currentAxis.name];
      if (dataAxis !== undefined) {
        if (currentAxis.categorical) {
          if (includeCategorical) {
            updateDistancesCategorical(
              distances,
              dataAxis.data as (string | null)[],
              coordinateValue as string,
              dataTarget.data
            );
          }
        } else {
          updateDistancesNumerical(
            distances,
            dataAxis.data as (number | null)[],
            coordinateValue as number,
            dataTarget.data,
            currentAxis
          );
        }
      }
    }
  }
  if (Object.keys(distances).length > 0) {
    // Transform the record containing all distances to a list with a tuple
    // containing the coordinate index and its distance to the current
    // coordinate.
    const distanceList = Object.keys(distances).map((key) => [
      parseInt(key),
      distances[parseInt(key)],
    ]);
    // Get the coordinates that are closest to the current one.
    distanceList.sort((a, b) => a[1] - b[1]);
    const lowestDistances = distanceList.slice(0, imputationNeighbors);
    // Get the data for all neighboring coordinates.
    const neighbors = [];
    for (const neighbor of lowestDistances) {
      neighbors.push(dataTarget.data[neighbor[0]]);
    }
    if (axis.categorical) {
      return imputeValueForCategoricalAxis(neighbors as string[]);
    } else {
      return imputeValueForNumericalAxis(neighbors as number[]);
    }
  }
  return undefined;
}

/**
 * Get the value of the neighbors that is most frequent and use it for
 * imputation.
 *
 * @param neighbors the values of the closest neighbors to the coordinate.
 * @returns the imputed categorical value based on frequency.
 */
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

/**
 * Get the average value of the neighbors and use it for imputation.
 *
 * @param neighbors the values of the closest neighbors to the coordinate.
 * @returns the imputed average of all considered neighbors.
 */
function imputeValueForNumericalAxis(neighbors: number[]): number {
  const sum = neighbors.reduce((a, b) => a + b, 0);
  return sum / neighbors.length;
}

/**
 * Update the distances for neighbor calculation for a categorical axis.
 * We add 1 to the distance if the categories do not match.
 *
 * @param distances current distance values for all coordinates.
 * @param dataAxis data for the axis for which we want to calculate distances.
 * @param coordinateValue value of the current coordinate for the current axis.
 * @param dataTarget data for the target axis.
 */
function updateDistancesCategorical(
  distances: Record<number, number>,
  dataAxis: (string | null)[],
  coordinateValue: string,
  dataTarget: (string | number | null)[]
) {
  for (const index in dataAxis) {
    if (dataTarget[index] !== null) {
      if (dataAxis[index] !== coordinateValue) {
        distances[index] = distances[index] ? distances[index] + 1 : 1;
      } else {
        distances[index] = distances[index] ? distances[index] : 0;
      }
    }
  }
}

/**
 * Update the distances for neighbor calculation for a numerical axis.
 * We normalize the distance and add that to the current distance value.
 *
 * @param distances current distance values for all coordinates.
 * @param dataAxis data for the axis for which we want to calculate distances.
 * @param coordinateValue value of the current coordinate for the current axis.
 * @param dataTarget data for the target axis.
 * @param currentAxis information about the current axis, used for extremes.
 */
function updateDistancesNumerical(
  distances: Record<number, number>,
  dataAxis: (number | null)[],
  coordinateValue: number,
  dataTarget: (string | number | null)[],
  currentAxis: AxisDescriptor
) {
  if (currentAxis.extremes !== undefined) {
    const divergence = currentAxis.extremes.max - currentAxis.extremes.min;
    for (const index in dataAxis) {
      if (dataTarget[index] !== null) {
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
