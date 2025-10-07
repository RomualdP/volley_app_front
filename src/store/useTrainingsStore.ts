import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Training } from "../types";

interface TrainingsState {
  readonly trainings: Training[];
  readonly selectedTraining: Training | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

interface TrainingsActions {
  readonly setTrainings: (trainings: Training[]) => void;
  readonly addTraining: (training: Training) => void;
  readonly updateTraining: (
    trainingId: string,
    updates: Partial<Training>,
  ) => void;
  readonly deleteTraining: (trainingId: string) => void;
  readonly selectTraining: (training: Training | null) => void;
  readonly setLoading: (loading: boolean) => void;
  readonly setError: (error: string | null) => void;
  readonly clearError: () => void;
  readonly getScheduledTrainings: () => Training[];
  readonly getUpcomingTrainings: (limit?: number) => Training[];
}

type TrainingsStore = TrainingsState & TrainingsActions;

const initialState: TrainingsState = {
  trainings: [],
  selectedTraining: null,
  isLoading: false,
  error: null,
};

export const useTrainingsStore = create<TrainingsStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setTrainings: (trainings: Training[]) => {
        set(
          (state) => ({
            ...state,
            trainings,
            isLoading: false,
            error: null,
          }),
          false,
          "trainings/setTrainings",
        );
      },

      addTraining: (training: Training) => {
        set(
          (state) => ({
            ...state,
            trainings: [training, ...state.trainings],
          }),
          false,
          "trainings/addTraining",
        );
      },

      updateTraining: (trainingId: string, updates: Partial<Training>) => {
        set(
          (state) => ({
            ...state,
            trainings: state.trainings.map((item) =>
              item.id === trainingId ? { ...item, ...updates } : item,
            ),
            selectedTraining:
              state.selectedTraining?.id === trainingId
                ? { ...state.selectedTraining, ...updates }
                : state.selectedTraining,
          }),
          false,
          "trainings/updateTraining",
        );
      },

      deleteTraining: (trainingId: string) => {
        set(
          (state) => ({
            ...state,
            trainings: state.trainings.filter((item) => item.id !== trainingId),
            selectedTraining:
              state.selectedTraining?.id === trainingId
                ? null
                : state.selectedTraining,
          }),
          false,
          "trainings/deleteTraining",
        );
      },

      selectTraining: (training: Training | null) => {
        set(
          (state) => ({
            ...state,
            selectedTraining: training,
          }),
          false,
          "trainings/selectTraining",
        );
      },

      setLoading: (isLoading: boolean) => {
        set(
          (state) => ({
            ...state,
            isLoading,
          }),
          false,
          "trainings/setLoading",
        );
      },

      setError: (error: string | null) => {
        set(
          (state) => ({
            ...state,
            error,
            isLoading: false,
          }),
          false,
          "trainings/setError",
        );
      },

      clearError: () => {
        set(
          (state) => ({
            ...state,
            error: null,
          }),
          false,
          "trainings/clearError",
        );
      },

      getScheduledTrainings: () => {
        const state = get();
        return state.trainings
          .filter((training) => training.status === "SCHEDULED")
          .sort(
            (a, b) =>
              new Date(a.scheduledAt).getTime() -
              new Date(b.scheduledAt).getTime(),
          );
      },

      getUpcomingTrainings: (limit = 5) => {
        const { getScheduledTrainings } = get();
        const now = new Date();
        return getScheduledTrainings()
          .filter((training) => new Date(training.scheduledAt) > now)
          .slice(0, limit);
      },
    }),
    {
      name: "trainings-store",
    },
  ),
);
