'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Layout } from '../../../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../../../components/ui';
import { Input, Select } from '../../../../components/forms';
import { useUsersStore, useSkillsStore } from '../../../../store';
import { formatDate } from '../../../../utils';
import Link from 'next/link';
import type { User, UserSkill, Skill, SkillLevel, SkillCategory } from '../../../../types';

const SKILL_RATING_OPTIONS = [
  { value: '1', label: '1 - Débutant' },
  { value: '2', label: '2 - Débutant+' },
  { value: '3', label: '3 - Novice' },
  { value: '4', label: '4 - Novice+' },
  { value: '5', label: '5 - Intermédiaire' },
  { value: '6', label: '6 - Intermédiaire+' },
  { value: '7', label: '7 - Confirmé' },
  { value: '8', label: '8 - Confirmé+' },
  { value: '9', label: '9 - Expert' },
  { value: '10', label: '10 - Maître' },
];

const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  ATTACK: 'Attaque',
  DEFENSE: 'Défense',
  SERVING: 'Service',
  RECEPTION: 'Réception',
  SETTING: 'Passe',
  BLOCKING: 'Contre',
  TEAMWORK: 'Esprit d\'équipe',
  LEADERSHIP: 'Leadership',
};

// Mock skills data
const MOCK_SKILLS: Skill[] = [
  {
    id: '1',
    name: 'Smash',
    description: 'Attaque puissante au filet',
    category: 'ATTACK',
    level: 'INTERMEDIATE',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Service flottant',
    description: 'Service technique sans rotation',
    category: 'SERVING',
    level: 'BEGINNER',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Réception',
    description: 'Réception de service',
    category: 'RECEPTION',
    level: 'INTERMEDIATE',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Contre simple',
    description: 'Blocage à une main',
    category: 'BLOCKING',
    level: 'BEGINNER',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Mock user skills data with ratings
const MOCK_USER_SKILLS: Record<string, UserSkill[]> = {
  '1': [
    {
      id: 'us1',
      userId: '1',
      skillId: '1',
      skill: MOCK_SKILLS[0],
      level: 'RATING_6' as SkillLevel,
      notes: 'Bon niveau technique, à améliorer en puissance',
      assessedBy: 'Coach Martin',
      assessedAt: new Date('2024-03-01'),
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-03-01'),
    },
    {
      id: 'us2',
      userId: '1',
      skillId: '3',
      skill: MOCK_SKILLS[2],
      level: 'RATING_8' as SkillLevel,
      notes: 'Excellente stabilité',
      assessedBy: 'Coach Martin',
      assessedAt: new Date('2024-03-01'),
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-03-01'),
    },
  ],
  '2': [
    {
      id: 'us3',
      userId: '2',
      skillId: '2',
      skill: MOCK_SKILLS[1],
      level: 'RATING_9' as SkillLevel,
      notes: 'Service très efficace',
      assessedBy: 'Coach Martin',
      assessedAt: new Date('2024-03-01'),
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-03-01'),
    },
  ],
};

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;

  const { users } = useUsersStore();
  const { skills, setSkills } = useSkillsStore();
  
  const [user, setUser] = useState<User | null>(null);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<UserSkill | null>(null);
  
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [skillForm, setSkillForm] = useState({
    skillId: '',
    rating: 1,
    notes: '',
  });

  useEffect(() => {
    // Load skills if not loaded
    if (skills.length === 0) {
      setSkills(MOCK_SKILLS);
    }

    // Find user
    const foundUser = users.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setProfileForm({
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
      });
    }

    // Load user skills
    const foundUserSkills = MOCK_USER_SKILLS[userId] || [];
    setUserSkills(foundUserSkills);
  }, [userId, users, skills.length, setSkills]);

  const handleProfileSubmit = () => {
    if (!user) return;
    
    // Here you would update the user in the store
    console.log('Update user profile:', profileForm);
    setIsEditingProfile(false);
  };

  const handleSkillSubmit = () => {
    if (!skillForm.skillId) return;

    const skill = skills.find(s => s.id === skillForm.skillId);
    if (!skill) return;

    if (editingSkill) {
      // Update existing skill
      const updatedSkills = userSkills.map(us =>
        us.id === editingSkill.id
          ? {
              ...us,
              level: `RATING_${skillForm.rating}` as SkillLevel,
              notes: skillForm.notes,
              updatedAt: new Date(),
            }
          : us
      );
      setUserSkills(updatedSkills);
    } else {
      // Add new skill
      const newUserSkill: UserSkill = {
        id: `us-${Date.now()}`,
        userId: userId,
        skillId: skillForm.skillId,
        skill: skill,
        level: `RATING_${skillForm.rating}` as SkillLevel,
        notes: skillForm.notes,
        assessedBy: 'Admin',
        assessedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setUserSkills([...userSkills, newUserSkill]);
    }

    resetSkillForm();
  };

  const handleEditSkill = (userSkill: UserSkill) => {
    setEditingSkill(userSkill);
    const rating = getRatingFromLevel(userSkill.level);
    setSkillForm({
      skillId: userSkill.skillId,
      rating: rating,
      notes: userSkill.notes || '',
    });
    setIsAddingSkill(true);
  };

  const handleDeleteSkill = (userSkillId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      setUserSkills(userSkills.filter(us => us.id !== userSkillId));
    }
  };

  const resetSkillForm = () => {
    setSkillForm({
      skillId: '',
      rating: 1,
      notes: '',
    });
    setIsAddingSkill(false);
    setEditingSkill(null);
  };

  const getRatingFromLevel = (level: SkillLevel): number => {
    if (level.startsWith('RATING_')) {
      return parseInt(level.replace('RATING_', '')) || 1;
    }
    // Legacy conversion for old levels
    switch (level) {
      case 'BEGINNER': return 2;
      case 'INTERMEDIATE': return 5;
      case 'ADVANCED': return 7;
      case 'EXPERT': return 9;
      default: return 1;
    }
  };

  const getRatingLabel = (rating: number): string => {
    const option = SKILL_RATING_OPTIONS.find(opt => opt.value === rating.toString());
    return option?.label || `${rating}/10`;
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 9) return 'bg-green-100 text-green-800';
    if (rating >= 7) return 'bg-orange-100 text-orange-800';
    if (rating >= 5) return 'bg-blue-100 text-blue-800';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const availableSkills = skills.filter(skill => 
    !userSkills.some(us => us.skillId === skill.id)
  );

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">Utilisateur non trouvé</p>
              <Link href="/admin/users">
                <Button variant="outline" className="mt-4">
                  Retour à la liste
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 font-heading">
                    Détail utilisateur
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Gestion du profil et des compétences
                  </p>
                </div>
                <Link href="/admin/users">
                  <Button variant="outline">
                    Retour à la liste
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Profile Section */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Profil utilisateur</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                      >
                        {isEditingProfile ? 'Annuler' : 'Modifier'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* User Avatar */}
                    <div className="text-center mb-6">
                      <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-orange-800">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    {isEditingProfile ? (
                      <ProfileEditForm
                        form={profileForm}
                        onChange={setProfileForm}
                        onSubmit={handleProfileSubmit}
                        onCancel={() => setIsEditingProfile(false)}
                      />
                    ) : (
                      <UserInfoDisplay user={user} />
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Skills Section */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Compétences ({userSkills.length})</CardTitle>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setIsAddingSkill(true)}
                        disabled={availableSkills.length === 0}
                      >
                        Ajouter une compétence
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    
                    {/* Add/Edit Skill Form */}
                    {isAddingSkill && (
                      <SkillForm
                        form={skillForm}
                        availableSkills={availableSkills}
                        isEditing={!!editingSkill}
                        onChange={setSkillForm}
                        onSubmit={handleSkillSubmit}
                        onCancel={resetSkillForm}
                      />
                    )}

                    {/* Skills List */}
                    <div className="space-y-4">
                      {userSkills.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">
                            Aucune compétence enregistrée
                          </p>
                        </div>
                      ) : (
                        userSkills.map((userSkill) => (
                          <SkillCard
                            key={userSkill.id}
                            userSkill={userSkill}
                            onEdit={() => handleEditSkill(userSkill)}
                            onDelete={() => handleDeleteSkill(userSkill.id)}
                            getRatingFromLevel={getRatingFromLevel}
                            getRatingLabel={getRatingLabel}
                            getRatingColor={getRatingColor}
                          />
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

// Smart component for profile editing
interface ProfileFormData {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

interface ProfileEditFormProps {
  readonly form: ProfileFormData;
  readonly onChange: (form: ProfileFormData) => void;
  readonly onSubmit: () => void;
  readonly onCancel: () => void;
}

function ProfileEditForm({ form, onChange, onSubmit, onCancel }: ProfileEditFormProps) {
  return (
    <div className="space-y-4">
      <Input
        id="firstName"
        name="firstName"
        type="text"
        label="Prénom"
        value={form.firstName}
        onChange={(e) => onChange({ ...form, firstName: e.target.value })}
        required
      />
      
      <Input
        id="lastName"
        name="lastName"
        type="text"
        label="Nom"
        value={form.lastName}
        onChange={(e) => onChange({ ...form, lastName: e.target.value })}
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        value={form.email}
        onChange={(e) => onChange({ ...form, email: e.target.value })}
        required
      />

      <div className="flex gap-2">
        <Button variant="primary" size="sm" onClick={onSubmit}>
          Sauvegarder
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
}

// Dumb component for user info display
interface UserInfoDisplayProps {
  readonly user: User;
}

function UserInfoDisplay({ user }: UserInfoDisplayProps) {
  return (
    <div className="space-y-3">
      <InfoItem label="Rôle" value={user.role} />
      <InfoItem 
        label="Statut" 
        value={user.isActive ? 'Actif' : 'Inactif'}
        valueClassName={user.isActive ? 'text-green-600' : 'text-red-600'}
      />
      <InfoItem label="Inscrit le" value={formatDate(user.createdAt)} />
      {user.lastLoginAt && (
        <InfoItem label="Dernière connexion" value={formatDate(user.lastLoginAt)} />
      )}
    </div>
  );
}

// Dumb component for info items
interface InfoItemProps {
  readonly label: string;
  readonly value: string;
  readonly valueClassName?: string;
}

function InfoItem({ label, value, valueClassName = 'text-gray-900' }: InfoItemProps) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-medium ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

// Smart component for skill form
interface SkillFormData {
  readonly skillId: string;
  readonly rating: number;
  readonly notes: string;
}

interface SkillFormProps {
  readonly form: SkillFormData;
  readonly availableSkills: Skill[];
  readonly isEditing: boolean;
  readonly onChange: (form: SkillFormData) => void;
  readonly onSubmit: () => void;
  readonly onCancel: () => void;
}

function SkillForm({ form, availableSkills, isEditing, onChange, onSubmit, onCancel }: SkillFormProps) {
  const skillOptions = availableSkills.map(skill => ({
    value: skill.id,
    label: `${skill.name} (${SKILL_CATEGORY_LABELS[skill.category]})`,
  }));

  return (
    <Card className="mb-6 border-orange-200">
      <CardContent className="py-4">
        <h3 className="text-lg font-medium mb-4">
          {isEditing ? 'Modifier la compétence' : 'Ajouter une compétence'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="skill"
            name="skill"
            label="Compétence"
            value={form.skillId}
            onChange={(e) => onChange({ ...form, skillId: e.target.value })}
            options={[
              { value: '', label: 'Sélectionner une compétence' },
              ...skillOptions,
            ]}
            disabled={isEditing}
          />

          <Select
            id="rating"
            name="rating"
            label="Niveau (1-10)"
            value={form.rating.toString()}
            onChange={(e) => onChange({ ...form, rating: parseInt(e.target.value) || 1 })}
            options={SKILL_RATING_OPTIONS}
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optionnel)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => onChange({ ...form, notes: e.target.value })}
              placeholder="Commentaires sur cette compétence..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            disabled={!form.skillId}
          >
            {isEditing ? 'Mettre à jour' : 'Ajouter'}
          </Button>
          <Button variant="outline" size="sm" onClick={onCancel}>
            Annuler
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Dumb component for skill cards
interface SkillCardProps {
  readonly userSkill: UserSkill;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
  readonly getRatingFromLevel: (level: SkillLevel) => number;
  readonly getRatingLabel: (rating: number) => string;
  readonly getRatingColor: (rating: number) => string;
}

function SkillCard({ 
  userSkill, 
  onEdit, 
  onDelete, 
  getRatingFromLevel, 
  getRatingLabel, 
  getRatingColor 
}: SkillCardProps) {
  const rating = getRatingFromLevel(userSkill.level);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{userSkill.skill.name}</h4>
          <p className="text-sm text-gray-600">
            {SKILL_CATEGORY_LABELS[userSkill.skill.category]}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(rating)}`}>
          {getRatingLabel(rating)}
        </span>
      </div>

      {userSkill.notes && (
        <p className="text-sm text-gray-600 mb-3 italic">
          &quot;{userSkill.notes}&quot;
        </p>
      )}

      {userSkill.assessedBy && (
        <p className="text-xs text-gray-500 mb-3">
          Évalué par {userSkill.assessedBy} le {formatDate(userSkill.assessedAt!)}
        </p>
      )}

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          Modifier
        </Button>
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