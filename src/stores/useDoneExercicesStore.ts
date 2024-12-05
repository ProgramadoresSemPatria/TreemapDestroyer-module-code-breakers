import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IDoneExercicesStore {
  doneExercisesId: string[];
}

const initialState: IDoneExercicesStore = {
  doneExercisesId: [],
};

export const useDoneExercicesStore = create<IDoneExercicesStore>()(
  persist(() => initialState, {
    name: "done-exercises-store",
  })
);
