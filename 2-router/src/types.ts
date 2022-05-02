export type Target = Document | Element | HTMLElement;

export type Obj = {
  [key: string]: any;
};

export type LocationType = {
  params: any;
  query: any;
};

export type Component = (location?: LocationType) => void;
