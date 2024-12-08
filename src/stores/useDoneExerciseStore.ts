import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IDoneExerciseStore {
  doneExercisesId?: Record<string, boolean>;
}

const initialState: IDoneExerciseStore = {};

export const useDoneExerciceStore = create<IDoneExerciseStore>()(
  persist(() => initialState, {
    name: "done-exercises-store",
  })
);
