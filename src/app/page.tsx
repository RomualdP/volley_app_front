'use client';

import { useEffect } from 'react';
import { Layout } from '../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../components/ui';
import { useNewsStore, useMatchesStore } from '../store';
import { formatDate } from '../utils';
import { ROUTES } from '../constants';
import Link from 'next/link';
import type { News, Match } from '../types';

// Mock data for news
const MOCK_NEWS: News[] = [
  {
    id: '1',
    title: 'Nouveau tournoi d\'été 2024',
    content: 'Nous sommes ravis d\'annoncer l\'ouverture des inscriptions pour le grand tournoi d\'été 2024. Les équipes peuvent s\'inscrire dès maintenant.',
    excerpt: 'Inscriptions ouvertes pour le tournoi d\'été 2024',
    author: 'Admin VolleyApp',
    isPublished: true,
    publishedAt: new Date('2024-03-15T10:00:00'),
    createdAt: new Date('2024-03-15T09:00:00'),
    updatedAt: new Date('2024-03-15T10:00:00'),
  },
  {
    id: '2',
    title: 'Mise à jour des règles de jeu',
    content: 'Quelques ajustements ont été apportés aux règles officielles. Consultez le règlement complet sur notre site.',
    excerpt: 'Nouvelles règles en vigueur',
    author: 'Commission Technique',
    isPublished: true,
    publishedAt: new Date('2024-03-10T14:30:00'),
    createdAt: new Date('2024-03-10T14:00:00'),
    updatedAt: new Date('2024-03-10T14:30:00'),
  },
  {
    id: '3',
    title: 'Résultats du championnat régional',
    content: 'Félicitations à toutes les équipes participantes ! Retrouvez tous les résultats et le classement final.',
    excerpt: 'Résultats du championnat régional disponibles',
    author: 'Organisation',
    isPublished: true,
    publishedAt: new Date('2024-03-05T18:00:00'),
    createdAt: new Date('2024-03-05T17:30:00'),
    updatedAt: new Date('2024-03-05T18:00:00'),
  },
];

export default function HomePage() {
  const { getLatestNews, setNews } = useNewsStore();
  const { matches } = useMatchesStore();

  useEffect(() => {
    // Load mock data
    setNews(MOCK_NEWS);
    // Matches are already loaded from the matches page
  }, [setNews]);

  const latestNews = getLatestNews(3);
  const nextMatch = getNextMatch(matches);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        {/* Hero Section */}
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-heading">
              VolleyApp
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Votre plateforme de gestion volleyball
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Latest News */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-heading">
                    Dernières actualités
                  </h2>
                  <Link href={ROUTES.ADMIN.NEWS}>
                    <Button variant="outline" size="sm">
                      Gérer les news
                    </Button>
                  </Link>
                </div>

                <div className="space-y-6">
                  {latestNews.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-12">
                        <p className="text-gray-500">Aucune actualité disponible</p>
                      </CardContent>
                    </Card>
                  ) : (
                    latestNews.map((news) => (
                      <NewsCard key={news.id} news={news} />
                    ))
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Next Match */}
                <Card>
                  <CardHeader>
                    <CardTitle>Prochain match</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {nextMatch ? (
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-sm font-medium">
                            <span>{nextMatch.homeTeam.name}</span>
                            <span className="text-gray-500">vs</span>
                            <span>{nextMatch.awayTeam.name}</span>
                          </div>
                        </div>
                        <div className="text-center text-sm text-gray-600">
                          {formatDate(nextMatch.scheduledAt)}
                        </div>
                        {nextMatch.location && (
                          <div className="text-center text-sm text-gray-500">
                            📍 {nextMatch.location}
                          </div>
                        )}
                        <Link href={`/matches/${nextMatch.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Voir les détails
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center">
                        Aucun match programmé
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href={ROUTES.MATCHES}>
                      <Button variant="outline" className="w-full">
                        Voir tous les matchs
                      </Button>
                    </Link>
                    <Link href={ROUTES.PROFILE}>
                      <Button variant="outline" className="w-full">
                        Mon profil
                      </Button>
                    </Link>
                    <Link href={ROUTES.ADMIN.BASE}>
                      <Button variant="outline" className="w-full">
                        Administration
                      </Button>
                    </Link>
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

interface NewsCardProps {
  readonly news: News;
}

function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {news.title}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
            {formatDate(news.publishedAt!)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {news.excerpt || news.content}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Par {news.author}</span>
          <Button variant="ghost" size="sm">
            Lire la suite
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getNextMatch(matches: Match[]): Match | null {
  const now = new Date();
  const upcomingMatches = matches
    .filter(match => 
      match.status === 'SCHEDULED' && 
      new Date(match.scheduledAt) > now
    )
    .sort((a, b) => 
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );

  return upcomingMatches.length > 0 ? upcomingMatches[0] : null;
}
