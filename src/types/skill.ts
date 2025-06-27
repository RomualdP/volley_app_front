export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly category: SkillCategory;
  readonly level: SkillLevel;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type SkillCategory = 
  | 'ATTACK' 
  | 'DEFENSE' 
  | 'SERVING' 
  | 'RECEPTION' 
  | 'SETTING' 
  | 'BLOCKING' 
  | 'TEAMWORK' 
  | 'LEADERSHIP';

export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface UserSkill {
  readonly id: string;
  readonly userId: string;
  readonly skillId: string;
  readonly skill: Skill;
  readonly level: SkillLevel;
  readonly experienceYears?: number;
  readonly notes?: string;
  readonly assessedBy?: string;
  readonly assessedAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface SkillCreateData {
  readonly name: string;
  readonly description?: string;
  readonly category: SkillCategory;
  readonly level: SkillLevel;
}

export interface SkillUpdateData {
  readonly name?: string;
  readonly description?: string;
  readonly category?: SkillCategory;
  readonly level?: SkillLevel;
  readonly isActive?: boolean;
}

export interface UserSkillCreateData {
  readonly skillId: string;
  readonly level: SkillLevel;
  readonly experienceYears?: number;
  readonly notes?: string;
}

export interface UserSkillUpdateData {
  readonly level?: SkillLevel;
  readonly experienceYears?: number;
  readonly notes?: string;
} 