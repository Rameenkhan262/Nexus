import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { Entrepreneur } from '../../types';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { useMeetings } from "../../context/MeetingContext";

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const { confirmedMeetings } = useMeetings();
  
  if (!user) return null;
  
  const sentRequests = getRequestsFromInvestor(user.id);
  const requestedEntrepreneurIds = sentRequests.map(req => req.entrepreneurId);
  
  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(entrepreneur.industry);
    
    return matchesSearch && matchesIndustry;
  });
  
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));
  
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prevSelected => 
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising entrepreneurs</p>
        </div>
        
        <Link to="/entrepreneurs">
          <Button leftIcon={<PlusCircle size={18} />}>
            View All Startups
          </Button>
        </Link>
      </div>
      
      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups, industries, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                  className="cursor-pointer"
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Users size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Total Startups</p>
                <h3 className="text-xl font-semibold text-primary-900">{entrepreneurs.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <PieChart size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Industries</p>
                <h3 className="text-xl font-semibold text-secondary-900">{industries.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Users size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Your Connections</p>
                <h3 className="text-xl font-semibold text-accent-900">
                  {sentRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

      </div>

      {/* ✅ CONFIRMED MEETINGS (MOVED HERE + SCROLLABLE) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold mb-2">📅 Confirmed Meetings</h3>

        <div className="h-48 overflow-y-auto space-y-2 pr-2">
  {confirmedMeetings.length === 0 && (
    <p className="text-gray-500 text-sm">No meetings yet</p>
  )}

  {confirmedMeetings.map((m, i) => (
    <div
      key={i}
      className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
    >
      {m.date.toDateString()}
    </div>
  ))}
</div>
      </div>
      
      {/* STARTUPS */}
      <div>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Featured Startups</h2>
          </CardHeader>
          
          <CardBody>
            {filteredEntrepreneurs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntrepreneurs.map(entrepreneur => (
                  <EntrepreneurCard
                    key={entrepreneur.id}
                    entrepreneur={entrepreneur}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No startups match your filters</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedIndustries([]);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};