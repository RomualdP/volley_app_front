'use client';

import { useEffect } from 'react';
import { Layout, Button } from '../../shared/components';
import { TeamCard } from '../../features/teams/components';
import { useTeamsStore } from '../../shared/store';
import type { Team } from '../../shared/types';

// Mock data for demonstration
const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Volleyball Club Paris',
    description: 'Club de volleyball professionnel basé à Paris, spécialisé dans les compétitions nationales.',
    foundedYear: 2015,
    logo: undefined,
    members: [
      {
        id: '1',
        userId: '1',
        teamId: '1',
        role: 'CAPTAIN',
        user: {
          id: '1',
          email: 'captain@example.com',
          firstName: 'Marie',
          lastName: 'Dubois',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        joinedAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        userId: '2',
        teamId: '1',
        role: 'PLAYER',
        user: {
          id: '2',
          email: 'player1@example.com',
          firstName: 'Paul',
          lastName: 'Martin',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        joinedAt: new Date('2024-01-01'),
      },
      {
        id: '3',
        userId: '3',
        teamId: '1',
        role: 'COACH',
        user: {
          id: '3',
          email: 'coach@example.com',
          firstName: 'Sophie',
          lastName: 'Legrand',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        joinedAt: new Date('2024-01-01'),
      },
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'AS Volley Lyon',
    description: 'Association sportive dédiée au volleyball amateur et semi-professionnel.',
    foundedYear: 2010,
    logo: undefined,
    members: [
      {
        id: '4',
        userId: '4',
        teamId: '2',
        role: 'CAPTAIN',
        user: {
          id: '4',
          email: 'captain2@example.com',
          firstName: 'Thomas',
          lastName: 'Bernard',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        joinedAt: new Date('2024-01-01'),
      },
      {
        id: '5',
        userId: '5',
        teamId: '2',
        role: 'PLAYER',
        user: {
          id: '5',
          email: 'player2@example.com',
          firstName: 'Julie',
          lastName: 'Rousseau',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        joinedAt: new Date('2024-01-01'),
      },
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export default function TeamsPage() {
  const { teams, setTeams, selectTeam } = useTeamsStore();

  // Initialize with mock data on component mount
  useEffect(() => {
    if (teams.length === 0) {
      setTeams(mockTeams);
    }
  }, [teams.length, setTeams]);

  const handleTeamSelect = (team: Team) => {
    selectTeam(team);
    console.log('Selected team:', team.name);
    // TODO: Navigation vers la page de détail de l'équipe
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Équipes</h1>
            <p className="mt-2 text-neutral-600">
              Gérez et consultez toutes vos équipes de volleyball
            </p>
          </div>
          <Button>
            Créer une équipe
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm14 10.5V9c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v7h2v6h4v-6h2v-1.5zm-8 0V9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v7h2v6h4v-6h2v-1.5z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Total équipes</p>
                <p className="text-2xl font-bold text-neutral-900">{teams.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Total joueurs</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {teams.reduce((total, team) => total + team.members.length, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Équipes actives</p>
                <p className="text-2xl font-bold text-neutral-900">{teams.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onSelect={handleTeamSelect}
            />
          ))}
        </div>

        {/* Empty State */}
        {teams.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900">
              Aucune équipe
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Commencez par créer votre première équipe de volleyball.
            </p>
            <div className="mt-6">
              <Button>
                Créer une équipe
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 