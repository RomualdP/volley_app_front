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
import Link from "next/link";

export default function TrainingDetailPage() {
  const params = useParams();
  const trainingId = params.id as string;

  const { selectedTraining, fetchTraining, isLoading, error } =
    useTrainingsApi();

  useEffect(() => {
    if (trainingId) {
      fetchTraining(trainingId);
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
