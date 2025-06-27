import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Skill, SkillCategory } from '../types';

interface SkillsState {
  readonly skills: Skill[];
  readonly selectedSkill: Skill | null;
  readonly categoryFilter: SkillCategory | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

interface SkillsActions {
  readonly setSkills: (skills: Skill[]) => void;
  readonly addSkill: (skill: Skill) => void;
  readonly updateSkill: (skillId: string, updates: Partial<Skill>) => void;
  readonly deleteSkill: (skillId: string) => void;
  readonly selectSkill: (skill: Skill | null) => void;
  readonly setCategoryFilter: (category: SkillCategory | null) => void;
  readonly setLoading: (loading: boolean) => void;
  readonly setError: (error: string | null) => void;
  readonly clearError: () => void;
}

type SkillsStore = SkillsState & SkillsActions;

const initialState: SkillsState = {
  skills: [],
  selectedSkill: null,
  categoryFilter: null,
  isLoading: false,
  error: null,
};

export const useSkillsStore = create<SkillsStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setSkills: (skills: Skill[]) => {
        set(
          (state) => ({
            ...state,
            skills,
            isLoading: false,
            error: null,
          }),
          false,
          'skills/setSkills'
        );
      },

      addSkill: (skill: Skill) => {
        set(
          (state) => ({
            ...state,
            skills: [...state.skills, skill],
          }),
          false,
          'skills/addSkill'
        );
      },

      updateSkill: (skillId: string, updates: Partial<Skill>) => {
        set(
          (state) => ({
            ...state,
            skills: state.skills.map((skill) =>
              skill.id === skillId ? { ...skill, ...updates } : skill
            ),
            selectedSkill:
              state.selectedSkill?.id === skillId
                ? { ...state.selectedSkill, ...updates }
                : state.selectedSkill,
          }),
          false,
          'skills/updateSkill'
        );
      },

      deleteSkill: (skillId: string) => {
        set(
          (state) => ({
            ...state,
            skills: state.skills.filter((skill) => skill.id !== skillId),
            selectedSkill:
              state.selectedSkill?.id === skillId ? null : state.selectedSkill,
          }),
          false,
          'skills/deleteSkill'
        );
      },

      selectSkill: (skill: Skill | null) => {
        set(
          (state) => ({
            ...state,
            selectedSkill: skill,
          }),
          false,
          'skills/selectSkill'
        );
      },

      setCategoryFilter: (categoryFilter: SkillCategory | null) => {
        set(
          (state) => ({
            ...state,
            categoryFilter,
          }),
          false,
          'skills/setCategoryFilter'
        );
      },

      setLoading: (isLoading: boolean) => {
        set(
          (state) => ({
            ...state,
            isLoading,
          }),
          false,
          'skills/setLoading'
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
          'skills/setError'
        );
      },

      clearError: () => {
        set(
          (state) => ({
            ...state,
            error: null,
          }),
          false,
          'skills/clearError'
        );
      },
    }),
    {
      name: 'skills-store',
    }
  )
); 