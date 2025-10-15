export interface Training {
  readonly id: string;
  readonly title: string;
  readonly description: string | null;
  readonly scheduledAt: Date;
  readonly duration: number;
  readonly location: string | null;
  readonly maxParticipants: number | null;
  readonly status: TrainingStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TrainingStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface TrainingCreateData {
  readonly title: string;
  readonly description?: string;
  readonly scheduledAt: string;
  readonly duration: number;
  readonly location?: string;
  readonly maxParticipants?: number;
}

export interface TrainingUpdateData {
  readonly title?: string;
  readonly description?: string;
  readonly scheduledAt?: string;
  readonly duration?: number;
  readonly location?: string;
  readonly maxParticipants?: number;
  readonly status?: TrainingStatus;
}

export interface TrainingRegistration {
  readonly id: string;
  readonly trainingId: string;
  readonly userId: string;
  readonly status: RegistrationStatus;
  readonly registeredAt: Date;
  readonly cancelledAt: Date | null;
  readonly user: {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly avatar: string | null;
  };
}

export type RegistrationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "WAITLIST";

export interface TrainingTeam {
  readonly id: string;
  readonly trainingId: string;
  readonly name: string;
  readonly averageLevel: number;
  readonly members: TeamMember[];
  readonly createdAt: Date;
}

export interface TeamMember {
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar: string | null;
  readonly gender: string | null;
  readonly level: number;
}
