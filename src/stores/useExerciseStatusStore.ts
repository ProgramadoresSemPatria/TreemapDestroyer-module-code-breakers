import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IExerciseStatus } from "../types/IExerciseStatus";

type ExerciseStatusStore = {
  exercisesStatus: IExerciseStatus[];
};

const initialState: ExerciseStatusStore = {
  exercisesStatus: [],
};

export const useExerciseStatusStore = create<ExerciseStatusStore>()(
  persist(() => initialState, {
    name: "exercises-status-store",
  })
);
