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
  score_direction: "lower_is_better" | "higher_is_better";
  title: string;
  description: string;
};