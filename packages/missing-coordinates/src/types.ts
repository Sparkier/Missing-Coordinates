export class DrawConfiguration {
  axesSpacing = 100;
  axisHeight = 100;
  axisLabelConfiguration = new AxisLabelConfiguration();
  axisAnnotationConfiguration = new AxisAnnotationConfiguration();
  margin: Margin = { left: 20, right: 20, top: 20, bottom: 20 };
  fontSize = 12;
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

export enum TopBottomPosition {
  ABOVE,
  BELOW,
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
  data: (number | string)[];
};

export type AxisDescriptor = {
  name: string;
  offset: number;
};
