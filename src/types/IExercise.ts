type TDificulty = "Easy" | "Medium" | "Hard";

export interface IExercise {
  id: string;
  nodeId: string;
  problem: string;
  link: string;
  dificulty: TDificulty;
  solution: string;
}
