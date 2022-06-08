export class DrawConfiguration {
  axesSpacing = 100;
  axisHeight = 100;
  axisLabelConfiguration = new AxisLabelConfiguration();
  axisAnnotationConfiguration = new AxisAnnotationConfiguration();
  margin: Margin = { left: 20, right: 20, top: 20, bottom: 20 };
  fontSize = 12;
  variation: Variation = Variation.DEFAULT;
  concept: Concept = Concept.INFORMATION_REMOVAL;
  missingValuesConfiguration = new MissingValuesConfiguraion();
  drawingOrder: DrawingOrder = DrawingOrder.RANDOM;
  coloring = {
    coloringAxis: "dim 1",
    ordinalColorTheme: "Category10",
    sequentialColorTheme: "cool",
  };
}

export class AxisLabelConfiguration {
  show = true;
  textAnchor = "middle";
  axisLabelPosition = TopBottomPosition.ABOVE;
  margin = 5;
}

export class AxisAnnotationConfiguration {
  show = true;
  textAnchor = "middle";
  margin = 5;
}

export class MissingValuesConfiguraion {
  missingValuesAxisSpacing = 50;
  imputationNeighbors = 2;
  glyphRadius = 4;
  missingValueOpacity = 0.1;
  strokeDasharray = "5 5";
  gradientFalloff = 0.25;
}

export enum TopBottomPosition {
  ABOVE,
  BELOW,
}

export enum Variation {
  DEFAULT,
  OPACITY,
  GRADIENT,
  DASHED,
  GLYPH,
}

export enum Concept {
  INFORMATION_REMOVAL,
  MISSING_VALUES_AXIS,
  IMPUTATION,
}

export enum DrawingOrder {
  RANDOM,
  ORDERED,
}

export type Margin = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type Data = {
  name?: string;
  axes: AxisData[];
};

export type AxisData = {
  name: string;
  data: (number | string | null)[];
};

export type AxisDescriptor = {
  name: string;
  offset: number;
  categorical: boolean;
  categoricalItems: string[] | undefined;
  extremes: { min: number; max: number } | undefined;
};

export type Coordinate = {
  values: Record<string, number | string | null>;
};
