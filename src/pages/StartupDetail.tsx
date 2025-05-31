
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Calendar, TrendingUp, MapPin, Users, Globe, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

// This should match the data from UnicornsIndia.tsx
interface UnicornCompany {
  id: string;
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

const StartupDetail = () => {
  const { startupId } = useParams<{ startupId: string }>();
  const startup = unicornData.find(company => company.id === startupId);

  if (!startup) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Startup not found</h2>
          <p className="text-gray-300">The startup you're looking for doesn't exist.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 bg-sidebar border-sidebar-border">
          <CardContent className="p-8">
            <div className="flex items-start gap-6 mb-6">
              {startup.logoUrl && (
                <img 
                  src={startup.logoUrl} 
                  alt={`${startup.name} logo`} 
                  className="w-20 h-20 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{startup.name}</h1>
                  {startup.isUnicorn ? (
                    <span className="bg-sidebar-primary text-sidebar-primary-foreground px-3 py-1 rounded font-medium">
                      🦄 Unicorn
                    </span>
                  ) : (
                    <span className="bg-yellow-600 text-yellow-100 px-3 py-1 rounded font-medium">
                      🌟 Soonicorn
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-lg mb-4">{startup.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-sidebar-primary" />
                    <div>
                      <p className="text-xs text-gray-400">Valuation</p>
                      <p className="text-sidebar-primary font-bold text-lg">{startup.valuation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Sector</p>
                      <p className="text-white font-medium">{startup.sector}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-white font-medium">{startup.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Founded</p>
                      <p className="text-white font-medium">{startup.foundedYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-sidebar border-sidebar-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Company Overview</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Business Model</h4>
                  <p className="text-gray-400">
                    {startup.sector === 'E-commerce' && 'Online marketplace connecting buyers and sellers across multiple categories.'}
                    {startup.sector === 'EdTech' && 'Technology-driven educational platform offering personalized learning experiences.'}
                    {startup.sector === 'Fintech' && 'Digital financial services platform offering payments and banking solutions.'}
                    {startup.sector === 'Food Delivery' && 'On-demand food delivery platform connecting restaurants with customers.'}
                    {startup.sector === 'Automotive' && 'Digital platform for buying and selling pre-owned vehicles.'}
                    {startup.sector === 'HealthTech' && 'Digital healthcare platform providing medical services and pharmacy solutions.'}
                    {startup.sector === 'Social Commerce' && 'Social media-driven commerce platform enabling peer-to-peer selling.'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Market Position</h4>
                  <p className="text-gray-400">
                    {startup.isUnicorn 
                      ? 'Leading player in the Indian startup ecosystem with proven market dominance.'
                      : 'Emerging player with strong growth potential in the Indian market.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-sidebar border-sidebar-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Company Age</span>
                  <span className="text-white font-medium">{2025 - startup.foundedYear} years</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Status</span>
                  <span className="text-white font-medium">
                    {startup.isUnicorn ? 'Unicorn' : 'Soonicorn'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Valuation Range</span>
                  <span className="text-white font-medium">
                    {startup.valuationNumber >= 1 ? '$1B+' : '$500M+'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Market</span>
                  <span className="text-white font-medium">India</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default StartupDetail;
