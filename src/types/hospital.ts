export type HospitalDataPoint = {
  id: number;
  indicator_name: string;
  unit_name: string;
  year: number;
  patients: number;
  score: number; 
};

export type IndicatorMeta = {
  indicator_id: string;
  title: string;
  description: string;
};