import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IDoneExerciseStore {
  doneExercisesId: string[];
}

const initialState: IDoneExerciseStore = {
  doneExercisesId: [],
};

export const useDoneExerciceStore = create<IDoneExerciseStore>()(
  persist(() => initialState, {
    name: "done-exercises-store",
  })
);
