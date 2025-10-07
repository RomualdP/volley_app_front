"use client";

import { useState, useEffect } from "react";
import { Layout } from "../../../components/layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "../../../components/ui";
import { Input } from "../../../components/forms";
import { useTrainingsApi } from "../../../features/trainings/hooks";
import Link from "next/link";
import type { Training, TrainingCreateData } from "../../../types";

export default function AdminTrainingsPage() {
  const { trainings, fetchTrainings, createTraining, deleteTraining } =
    useTrainingsApi();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<TrainingCreateData>({
    title: "",
    scheduledAt: "",
    duration: 120,
    description: "",
    location: "",
    maxParticipants: 20,
  });

  useEffect(() => {
    fetchTrainings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const resetForm = () => {
    setFormData({
      title: "",
      scheduledAt: "",
      duration: 120,
      description: "",
      location: "",
      maxParticipants: 20,
    });
    setIsCreating(false);
  };

  const handleFormChange = (
    field: keyof TrainingCreateData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.scheduledAt) {
      return;
    }

    const success = await createTraining({
      title: formData.title,
      scheduledAt: formData.scheduledAt,
      duration: formData.duration,
      description: formData.description || undefined,
      location: formData.location || undefined,
      maxParticipants: formData.maxParticipants || undefined,
    });

    if (success) {
      await fetchTrainings();
      resetForm();
    }
  };

  const handleDelete = async (trainingId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet entraînement ?")) {
      await deleteTraining(trainingId);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 font-heading">
                    Gestion des entraînements
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Créez et gérez les sessions d&apos;entraînement
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href="/admin">
                    <Button variant="outline">Retour à l&apos;admin</Button>
                  </Link>
                  <Button
                    variant="primary"
                    onClick={() => setIsCreating(true)}
                    disabled={isCreating}
                  >
                    Créer un entraînement
                  </Button>
                </div>
              </div>
            </div>

            {/* Create Form */}
            {isCreating && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Nouvel entraînement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    id="training-title"
                    name="title"
                    type="text"
                    label="Titre"
                    value={formData.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    placeholder="Ex: Entraînement technique"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      id="training-scheduled-at"
                      name="scheduledAt"
                      type="datetime-local"
                      label="Date et heure"
                      value={formData.scheduledAt}
                      onChange={(e) =>
                        handleFormChange("scheduledAt", e.target.value)
                      }
                      required
                    />

                    <Input
                      id="training-duration"
                      name="duration"
                      type="number"
                      label="Durée (minutes)"
                      value={formData.duration.toString()}
                      onChange={(e) =>
                        handleFormChange("duration", parseInt(e.target.value))
                      }
                      placeholder="120"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      id="training-location"
                      name="location"
                      type="text"
                      label="Lieu"
                      value={formData.location || ""}
                      onChange={(e) =>
                        handleFormChange("location", e.target.value)
                      }
                      placeholder="Ex: Gymnase Municipal"
                    />

                    <Input
                      id="training-max-participants"
                      name="maxParticipants"
                      type="number"
                      label="Participants maximum"
                      value={formData.maxParticipants?.toString() || ""}
                      onChange={(e) =>
                        handleFormChange(
                          "maxParticipants",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      placeholder="20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                      placeholder="Description de la session..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={!formData.title.trim() || !formData.scheduledAt}
                    >
                      Créer
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trainings List */}
            <Card>
              <CardHeader>
                <CardTitle>Entraînements ({trainings?.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {trainings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucun entraînement</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {trainings.map((training) => (
                      <TrainingItem
                        key={training.id}
                        training={training}
                        onDelete={() => handleDelete(training.id)}
                        formatDate={formatDate}
                        getStatusLabel={getStatusLabel}
                        getStatusColor={getStatusColor}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface TrainingItemProps {
  readonly training: Training;
  readonly onDelete: () => void;
  readonly formatDate: (date: Date) => string;
  readonly getStatusLabel: (status: string) => string;
  readonly getStatusColor: (status: string) => string;
}

function TrainingItem({
  training,
  onDelete,
  formatDate,
  getStatusLabel,
  getStatusColor,
}: TrainingItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {training.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span>{formatDate(training.scheduledAt)}</span>
            <span>{training.duration} min</span>
            {training.location && <span>📍 {training.location}</span>}
            {training.maxParticipants && (
              <span>👥 Max {training.maxParticipants} participants</span>
            )}
          </div>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(training.status)}`}
          >
            {getStatusLabel(training.status)}
          </span>
        </div>
      </div>

      {training.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {training.description}
        </p>
      )}

      <div className="flex gap-2">
        <Link href={`/admin/trainings/${training.id}`}>
          <Button variant="outline" size="sm">
            Voir détails
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700"
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
}
