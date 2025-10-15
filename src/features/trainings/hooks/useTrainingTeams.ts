import { useCallback, useState } from "react";
import { useApi } from "../../../shared/hooks/useApi";
import type { TrainingTeam } from "../../../types";

export const useTrainingTeams = () => {
  const teamsApi = useApi<TrainingTeam[]>();
  const generateApi = useApi<{ teamIds: string[] }>();
  const [teams, setTeams] = useState<TrainingTeam[]>([]);

  const fetchTeams = useCallback(
    async (trainingId: string) => {
      try {
        const response = await teamsApi.get(`/trainings/${trainingId}/teams`);

        if (response && Array.isArray(response)) {
          setTeams(response);
        } else {
          setTeams([]);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setTeams([]);
      }
    },
    [teamsApi],
  );

  const generateTeams = useCallback(
    async (trainingId: string) => {
      try {
        await generateApi.post(`/trainings/${trainingId}/generate-teams`);
        // Refresh teams after generation
        await fetchTeams(trainingId);
        return true;
      } catch (error) {
        console.error("Error generating teams:", error);
        return false;
      }
    },
    [generateApi, fetchTeams],
  );

  return {
    teams,
    isLoading: teamsApi.isLoading || generateApi.isLoading,
    error: teamsApi.error || generateApi.error,
    fetchTeams,
    generateTeams,
  };
};
