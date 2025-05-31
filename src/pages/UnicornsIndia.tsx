
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Calendar, TrendingUp, MapPin } from 'lucide-react';

interface UnicornCompany {
  id: string;
  name: string;
  sector: string;
  valuation: string;
  valuationNumber: number; // For sorting
  city: string;
  foundedYear: number;
  logoUrl?: string;
  description: string;
  isUnicorn: boolean;
}

const unicornData: UnicornCompany[] = [
  {
    id: '1',
    name: 'Flipkart',
    sector: 'E-commerce',
    valuation: '$37.6B',
    valuationNumber: 37.6,
    city: 'Bangalore',
    foundedYear: 2007,
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    description: 'India\'s leading e-commerce marketplace offering a wide range of products.',
    isUnicorn: true
  },
  {
    id: '2',
    name: 'Byju\'s',
    sector: 'EdTech',
    valuation: '$22B',
    valuationNumber: 22,
    city: 'Bangalore',
    foundedYear: 2011,
    logoUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop',
    description: 'Online education platform providing personalized learning programs.',
    isUnicorn: true
  },
  {
    id: '3',
    name: 'Paytm',
    sector: 'Fintech',
    valuation: '$16B',
    valuationNumber: 16,
    city: 'Noida',
    foundedYear: 2010,
    logoUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    description: 'Digital payments and financial services platform.',
    isUnicorn: true
  },
  {
    id: '4',
    name: 'Swiggy',
    sector: 'Food Delivery',
    valuation: '$10.7B',
    valuationNumber: 10.7,
    city: 'Bangalore',
    foundedYear: 2014,
    logoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop',
    description: 'On-demand delivery platform for food and other essentials.',
    isUnicorn: true
  },
  {
    id: '5',
    name: 'Razorpay',
    sector: 'Fintech',
    valuation: '$7.5B',
    valuationNumber: 7.5,
    city: 'Bangalore',
    foundedYear: 2014,
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    description: 'Payment gateway and financial services for businesses.',
    isUnicorn: true
  },
  {
    id: '6',
    name: 'Zomato',
    sector: 'Food Delivery',
    valuation: '$5.4B',
    valuationNumber: 5.4,
    city: 'Gurgaon',
    foundedYear: 2008,
    logoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop',
    description: 'Food delivery and restaurant discovery platform.',
    isUnicorn: true
  },
  {
    id: '7',
    name: 'Cars24',
    sector: 'Automotive',
    valuation: '$900M',
    valuationNumber: 0.9,
    city: 'Gurgaon',
    foundedYear: 2015,
    logoUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=100&h=100&fit=crop',
    description: 'Used car buying and selling platform.',
    isUnicorn: false
  },
  {
    id: '8',
    name: 'PharmEasy',
    sector: 'HealthTech',
    valuation: '$800M',
    valuationNumber: 0.8,
    city: 'Mumbai',
    foundedYear: 2015,
    logoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop',
    description: 'Online pharmacy and healthcare platform.',
    isUnicorn: false
  },
  {
    id: '9',
    name: 'Meesho',
    sector: 'Social Commerce',
    valuation: '$700M',
    valuationNumber: 0.7,
    city: 'Bangalore',
    foundedYear: 2015,
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    description: 'Social commerce platform enabling reselling through social media.',
    isUnicorn: false
  }
];

const UnicornsIndia = () => {
  const [filterType, setFilterType] = useState<'all' | 'unicorns' | 'sunicorns'>('all');

  const filteredCompanies = unicornData
    .filter(company => {
      if (filterType === 'unicorns') return company.isUnicorn;
      if (filterType === 'sunicorns') return !company.isUnicorn;
      return true;
    })
    .sort((a, b) => b.valuationNumber - a.valuationNumber); // Sort by valuation descending

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
            All Companies ({unicornData.length})
          </Button>
          <Button 
            variant={filterType === 'unicorns' ? 'default' : 'outline'}
            className={filterType === 'unicorns' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent'}
            onClick={() => setFilterType('unicorns')}
          >
            Unicorns ({unicornData.filter(c => c.isUnicorn).length})
          </Button>
          <Button 
            variant={filterType === 'sunicorns' ? 'default' : 'outline'}
            className={filterType === 'sunicorns' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent'}
            onClick={() => setFilterType('sunicorns')}
          >
            Soonicorns ({unicornData.filter(c => !c.isUnicorn).length})
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
                          <div className="font-semibold text-white">{company.name}</div>
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
