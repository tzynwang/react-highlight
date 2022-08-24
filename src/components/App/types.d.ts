export interface Raw {
  type: number;
  length: number;
}

export interface MarkIndex extends Raw {
  index: number;
  range: number[];
}
