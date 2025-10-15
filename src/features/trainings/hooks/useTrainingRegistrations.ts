import { useCallback, useState } from "react";
import { useApi } from "../../../shared/hooks/useApi";
import type {
  TrainingRegistration,
  User,
  PaginatedResponse,
} from "../../../types";

export const useTrainingRegistrations = () => {
  const registrationsApi = useApi<TrainingRegistration[]>();
  const usersApi = useApi<PaginatedResponse<User>>();
  const registerApi = useApi<{ id: string }>();
  const [registrations, setRegistrations] = useState<TrainingRegistration[]>(
    [],
  );
  const [users, setUsers] = useState<User[]>([]);

  const fetchRegistrations = useCallback(
    async (trainingId: string, status?: string) => {
      try {
        const queryParams = new URLSearchParams();
        if (status) queryParams.append("status", status);

        const url = `/trainings/${trainingId}/registrations${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;
        const response = await registrationsApi.get(url);

        if (response && Array.isArray(response)) {
          setRegistrations(response);
        } else {
          setRegistrations([]);
        }
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setRegistrations([]);
      }
    },
    [registrationsApi],
  );

  const fetchUsers = useCallback(async () => {
    try {
      // Fetch all users with a high limit to get everyone
      const response = await usersApi.get("/users?limit=1000");
      if (response && Array.isArray(response)) {
        setUsers(response);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  }, [usersApi]);

  const registerUser = useCallback(
    async (trainingId: string, userId: string) => {
      try {
        await registerApi.post(`/trainings/${trainingId}/registrations`, {
          userId,
        });
        // Refresh registrations after successful registration
        await fetchRegistrations(trainingId);
        return true;
      } catch (error) {
        console.error("Error registering user:", error);
        return false;
      }
    },
    [registerApi, fetchRegistrations],
  );

  return {
    registrations,
    users,
    isLoading: registrationsApi.isLoading || usersApi.isLoading,
    error: registrationsApi.error || usersApi.error,
    fetchRegistrations,
    fetchUsers,
    registerUser,
  };
};
