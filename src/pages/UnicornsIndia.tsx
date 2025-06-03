
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Calendar, TrendingUp, MapPin } from 'lucide-react';

interface UnicornCompany {
  id: number;
  name: string;
  sector: string;
  valuation: string;
  valuationNumber: number;
  city: string;
  foundedYear: number;
  logoUrl?: string;
  description: string;
  isUnicorn: boolean;
}

const UnicornsIndia = () => {
  const [filterType, setFilterType] = useState<'all' | 'unicorns' | 'sunicorns'>('all');
  const [startups, setStartups] = useState<UnicornCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://moonmovement.onrender.com/api/startups');
        if (!response.ok) {
          throw new Error('Failed to fetch startups');
        }
        const startupsData = await response.json();
        setStartups(startupsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch startups');
        console.error('Error fetching startups:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const filteredCompanies = startups
    .filter(company => {
      if (filterType === 'unicorns') return company.isUnicorn;
      if (filterType === 'sunicorns') return !company.isUnicorn;
      return true;
    })
    .sort((a, b) => b.valuationNumber - a.valuationNumber);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Indian Startup Ecosystem</h1>
            <p className="text-gray-300">Discover India's most valuable startups and emerging companies</p>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-300">Loading startups...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Indian Startup Ecosystem</h1>
            <p className="text-gray-300">Discover India's most valuable startups and emerging companies</p>
          </div>
          <div className="text-center py-8">
            <p className="text-red-400">Error: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4 bg-sidebar-primary hover:bg-sidebar-primary/90">
              Retry
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Indian Startup Ecosystem</h1>
          <p className="text-gray-300">Discover India's most valuable startups and emerging companies</p>
        </div>

        <div className="flex gap-4 mb-6">
          <Button 
            variant={filterType === 'all' ? 'default' : 'outline'}
            className={filterType === 'all' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent'}
            onClick={() => setFilterType('all')}
          >
            All Companies ({startups.length})
          </Button>
          <Button 
            variant={filterType === 'unicorns' ? 'default' : 'outline'}
            className={filterType === 'unicorns' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent'}
            onClick={() => setFilterType('unicorns')}
          >
            Unicorns ({startups.filter(c => c.isUnicorn).length})
          </Button>
          <Button 
            variant={filterType === 'sunicorns' ? 'default' : 'outline'}
            className={filterType === 'sunicorns' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent'}
            onClick={() => setFilterType('sunicorns')}
          >
            Soonicorns ({startups.filter(c => !c.isUnicorn).length})
          </Button>
        </div>

        <Card className="bg-sidebar border-sidebar-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-sidebar-border hover:bg-sidebar-accent">
                  <TableHead className="text-white font-semibold">Rank</TableHead>
                  <TableHead className="text-white font-semibold">Company</TableHead>
                  <TableHead className="text-white font-semibold">Sector</TableHead>
                  <TableHead className="text-white font-semibold">Valuation</TableHead>
                  <TableHead className="text-white font-semibold">Location</TableHead>
                  <TableHead className="text-white font-semibold">Founded</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company, index) => (
                  <TableRow key={company.id} className="border-sidebar-border hover:bg-sidebar-accent transition-colors">
                    <TableCell className="text-gray-300 font-medium">
                      #{index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {company.logoUrl && (
                          <img 
                            src={company.logoUrl} 
                            alt={`${company.name} logo`} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <Link to={`/startup/${company.id}`}>
                            <div className="font-semibold text-white hover:text-sidebar-primary cursor-pointer">
                              {company.name}
                            </div>
                          </Link>
                          <div className="text-xs text-gray-400 line-clamp-1">{company.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs bg-sidebar-accent text-sidebar-accent-foreground px-2 py-1 rounded">
                        {company.sector}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-sidebar-primary text-lg">
                        {company.valuation}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {company.city}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {company.foundedYear}
                      </div>
                    </TableCell>
                    <TableCell>
                      {company.isUnicorn ? (
                        <span className="text-xs bg-sidebar-primary text-sidebar-primary-foreground px-2 py-1 rounded font-medium">
                          🦄 Unicorn
                        </span>
                      ) : (
                        <span className="text-xs bg-yellow-600 text-yellow-100 px-2 py-1 rounded font-medium">
                          🌟 Soonicorn
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No companies found for the selected filter.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UnicornsIndia;
