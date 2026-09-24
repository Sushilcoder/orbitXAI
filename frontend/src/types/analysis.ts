export type AnalysisMode =
  | "SINGLE_IMAGE"
  | "BI_TEMPORAL"
  | "MULTISENSOR";

export type AnalysisState =
  | "IDLE"
  | "UPLOADING"
  | "READY"
  | "ANALYZING"
  | "COMPLETED"
  | "ERROR";

export type ImagerySlot = "IMAGE" | "T1" | "T2" | "OPTICAL" | "SAR";

export interface UploadedImagery {
  id: string;
  name: string;
  size: number;
  type: string;
  slot: ImagerySlot;
  previewUrl?: string;
}

export interface AnalysisQuery {
  text: string;
  mode: AnalysisMode;
}

export interface AnalysisResult {
  answer?: string;
  confidence?: number;
  task?: string;
}