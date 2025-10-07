import { useCallback } from "react";
import { useApi } from "../../../shared/hooks/useApi";
import { useTrainingsStore } from "../../../store";
import type { Training, TrainingCreateData } from "../../../types";

export const useTrainingsApi = () => {
  const trainingsApi = useApi<Training[]>();
  const trainingItemApi = useApi<Training>();
  const store = useTrainingsStore();

  const fetchTrainings = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
    }) => {
      store.setLoading(true);

      try {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.status) queryParams.append("status", params.status);
        if (params?.dateFrom) queryParams.append("dateFrom", params.dateFrom);
        if (params?.dateTo) queryParams.append("dateTo", params.dateTo);

        const url = `/trainings${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
        const response = await trainingsApi.get(url);

        if (response && Array.isArray(response)) {
          store.setTrainings(response);
        } else {
          store.setTrainings([]);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erreur lors du chargement des entraînements";
        store.setError(errorMessage);
      } finally {
        store.setLoading(false);
      }
    },
    [],
  );

  const fetchTraining = useCallback(async (trainingId: string) => {
    store.setLoading(true);

    try {
      const training = await trainingItemApi.get(`/trainings/${trainingId}`);
      if (training) {
        store.selectTraining(training);
        return training;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors du chargement de l'entraînement";
      store.setError(errorMessage);
    } finally {
      store.setLoading(false);
    }

    return null;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createTraining = useCallback(
    async (trainingData: TrainingCreateData) => {
      store.setLoading(true);

      try {
        const newTraining = await trainingItemApi.post(
          "/trainings",
          trainingData,
        );
        if (newTraining) {
          store.addTraining(newTraining);
          return newTraining;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erreur lors de la création de l'entraînement";
        store.setError(errorMessage);
      } finally {
        store.setLoading(false);
      }

      return null;
    },
    [],
  );

  const updateTraining = useCallback(
    async (trainingId: string, updates: Partial<Training>) => {
      store.setLoading(true);

      try {
        const updatedTraining = await trainingItemApi.put(
          `/trainings/${trainingId}`,
          updates,
        );
        if (updatedTraining) {
          store.updateTraining(trainingId, updatedTraining);
          return updatedTraining;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise à jour de l'entraînement";
        store.setError(errorMessage);
      } finally {
        store.setLoading(false);
      }

      return null;
    },
    [],
  );

  const deleteTraining = useCallback(async (trainingId: string) => {
    store.setLoading(true);

    try {
      await trainingItemApi.delete(`/trainings/${trainingId}`);
      store.deleteTraining(trainingId);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression de l'entraînement";
      store.setError(errorMessage);
      return false;
    } finally {
      store.setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    trainings: store.trainings,
    selectedTraining: store.selectedTraining,
    isLoading:
      store.isLoading || trainingsApi.isLoading || trainingItemApi.isLoading,
    error: store.error || trainingsApi.error || trainingItemApi.error,

    selectTraining: store.selectTraining,
    clearError: store.clearError,
    getScheduledTrainings: store.getScheduledTrainings,
    getUpcomingTrainings: store.getUpcomingTrainings,

    fetchTrainings,
    fetchTraining,
    createTraining,
    updateTraining,
    deleteTraining,
  };
};
