/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Layout } from "../../../../components/layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "../../../../components/ui";
import { useTrainingsApi } from "../../../../features/trainings/hooks";
import { useTrainingRegistrations } from "../../../../features/trainings/hooks/useTrainingRegistrations";
import { useTrainingTeams } from "../../../../features/trainings/hooks/useTrainingTeams";
import Link from "next/link";
import Image from "next/image";

export default function TrainingDetailPage() {
  const params = useParams();
  const trainingId = params.id as string;

  const { selectedTraining, fetchTraining, isLoading, error } =
    useTrainingsApi();

  const {
    registrations,
    users,
    isLoading: registrationsLoading,
    fetchRegistrations,
    fetchUsers,
    registerUser,
  } = useTrainingRegistrations();

  const {
    teams,
    isLoading: teamsLoading,
    fetchTeams,
    generateTeams,
  } = useTrainingTeams();

  useEffect(() => {
    if (trainingId) {
      fetchTraining(trainingId);
      fetchRegistrations(trainingId);
      fetchUsers();
      fetchTeams(trainingId);
    }
  }, [trainingId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Link href="/admin/trainings">
                <Button variant="outline">Retour aux entraînements</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!selectedTraining) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-4">Entraînement non trouvé</p>
              <Link href="/admin/trainings">
                <Button variant="outline">Retour aux entraînements</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h${mins}` : `${hours}h`;
    }
    return `${mins} min`;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      SCHEDULED: "Planifié",
      IN_PROGRESS: "En cours",
      COMPLETED: "Terminé",
      CANCELLED: "Annulé",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      SCHEDULED: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-green-100 text-green-800",
      COMPLETED: "bg-gray-100 text-gray-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Link href="/admin/trainings">
                  <Button variant="outline">← Retour aux entraînements</Button>
                </Link>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedTraining.status)}`}
                >
                  {getStatusLabel(selectedTraining.status)}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 font-heading">
                {selectedTraining.title}
              </h1>
            </div>

            {/* Main Info Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem
                    icon="📅"
                    label="Date"
                    value={formatDate(selectedTraining.scheduledAt)}
                  />
                  <InfoItem
                    icon="🕐"
                    label="Heure"
                    value={formatTime(selectedTraining.scheduledAt)}
                  />
                </div>

                {/* Duration & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem
                    icon="⏱️"
                    label="Durée"
                    value={formatDuration(selectedTraining.duration)}
                  />
                  {selectedTraining.location && (
                    <InfoItem
                      icon="📍"
                      label="Lieu"
                      value={selectedTraining.location}
                    />
                  )}
                </div>

                {/* Max Participants */}
                {selectedTraining.maxParticipants && (
                  <InfoItem
                    icon="👥"
                    label="Participants maximum"
                    value={`${selectedTraining.maxParticipants} personnes`}
                  />
                )}

                {/* Description */}
                {selectedTraining.description && (
                  <div className="pt-4 border-t">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">📝</span>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Description
                        </h3>
                        <p className="text-gray-900 whitespace-pre-wrap">
                          {selectedTraining.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Participants Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Registered Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Participants inscrits</CardTitle>
                </CardHeader>
                <CardContent>
                  {registrationsLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                    </div>
                  ) : registrations.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Aucun participant inscrit
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {registrations.map((registration) => (
                        <div
                          key={registration.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {registration.user.avatar ? (
                              <Image
                                src={registration.user.avatar}
                                alt={`${registration.user.firstName} ${registration.user.lastName}`}
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
                                <span className="text-orange-700 font-semibold text-sm">
                                  {registration.user.firstName.charAt(0)}
                                  {registration.user.lastName.charAt(0)}
                                </span>
                              </div>
                            )}
                            <span className="font-medium text-gray-900">
                              {registration.user.firstName}{" "}
                              {registration.user.lastName}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 px-2 py-1 bg-green-100 rounded">
                            {registration.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Available Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Utilisateurs disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  {registrationsLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                    </div>
                  ) : (
                    (() => {
                      const registeredUserIds = new Set(
                        registrations.map((r) => r.userId),
                      );
                      const availableUsers = users.filter(
                        (user) => !registeredUserIds.has(user.id),
                      );

                      return availableUsers.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                          Tous les utilisateurs sont inscrits
                        </p>
                      ) : (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {availableUsers.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                {user.avatar ? (
                                  <Image
                                    src={user.avatar}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                                    <span className="text-blue-700 font-semibold text-sm">
                                      {user.firstName.charAt(0)}
                                      {user.lastName.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <span className="font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() =>
                                  registerUser(trainingId, user.id)
                                }
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                +
                              </Button>
                            </div>
                          ))}
                        </div>
                      );
                    })()
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Teams Generation Section */}
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Équipes d'entraînement</CardTitle>
                <Button
                  onClick={() => generateTeams(trainingId)}
                  disabled={teamsLoading || registrations.length === 0}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {teamsLoading ? "Génération..." : "Générer les équipes"}
                </Button>
              </CardHeader>
              <CardContent>
                {teamsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                      Génération des équipes...
                    </p>
                  </div>
                ) : teams.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Aucune équipe générée. Cliquez sur "Générer les équipes"
                      pour créer des équipes équilibrées.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teams.map((team) => (
                      <div
                        key={team.id}
                        className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg text-gray-900">
                            {team.name}
                          </h3>
                          <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                            Niveau: {team.averageLevel.toFixed(1)}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {team.members.map((member, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                            >
                              {member.avatar ? (
                                <Image
                                  src={member.avatar}
                                  alt={`${member.firstName} ${member.lastName}`}
                                  width={32}
                                  height={32}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                                  <span className="text-blue-700 font-semibold text-xs">
                                    {member.firstName.charAt(0)}
                                    {member.lastName.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {member.firstName} {member.lastName}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <span>Niveau: {member.level}</span>
                                  {member.gender && (
                                    <>
                                      <span>•</span>
                                      <span>
                                        {member.gender === "MALE" ? "H" : "F"}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            {team.members.length} joueur
                            {team.members.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadata Card */}
            <Card>
              <CardHeader>
                <CardTitle>Métadonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Créé le</p>
                    <p className="text-gray-900">
                      {new Date(selectedTraining.createdAt).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Dernière modification
                    </p>
                    <p className="text-gray-900">
                      {new Date(selectedTraining.updatedAt).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Identifiant</p>
                  <p className="text-gray-900 font-mono text-sm">
                    {selectedTraining.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface InfoItemProps {
  readonly icon: string;
  readonly label: string;
  readonly value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
}
