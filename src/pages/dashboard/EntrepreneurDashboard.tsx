import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';
import { useMeetings } from "../../context/MeetingContext";

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors] = useState(investors.slice(0, 3));
  const { confirmedMeetings } = useMeetings();

  useEffect(() => {
    if (user) {
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);

  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prev =>
      prev.map(req => (req.id === requestId ? { ...req, status } : req))
    );
  };

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
        </div>

        <Link to="/investors">
          <Button leftIcon={<PlusCircle size={18} />}>
            Find Investors
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border border-blue-100">
  <CardBody>
    <div className="flex items-center">
      
      {/* ICON */}
      <div className="p-3 bg-blue-100 rounded-full mr-4">
        <Bell size={20} className="text-blue-600" />
      </div>

      {/* TEXT */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Pending Requests
        </p>
        <h3 className="text-xl font-semibold text-blue-900">
          {pendingRequests.length}
        </h3>
      </div>

    </div>
  </CardBody>
</Card>

        <Card className="bg-green-50 border border-green-100">
  <CardBody>
    <div className="flex items-center">
      <div className="p-3 bg-green-100 rounded-full mr-4">
        <Users size={20} className="text-green-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-green-600">
          Total Connections
        </p>
        <h3 className="text-xl font-semibold text-green-900">
  {collaborationRequests.filter(r => r.status === 'accepted').length}
</h3>
      </div>
    </div>
  </CardBody>
</Card>

        <Card className="bg-yellow-50 border border-yellow-100">
  <CardBody>
    <div className="flex items-center">
      <div className="p-3 bg-yellow-100 rounded-full mr-4">
        <Calendar size={20} className="text-yellow-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-yellow-600">
          Upcoming Meetings
        </p>
        <h3 className="text-xl font-semibold text-yellow-900">
          2
        </h3>
      </div>
    </div>
  </CardBody>
</Card>

        <Card className="bg-gray-50 border border-gray-200">
  <CardBody>
    <div className="flex items-center">
      <div className="p-3 bg-gray-100 rounded-full mr-4">
        <TrendingUp size={20} className="text-gray-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">
          Profile Views
        </p>
        <h3 className="text-xl font-semibold text-gray-900">
          24
        </h3>
      </div>
    </div>
  </CardBody>
</Card>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Collaboration Requests</h2>
            </CardHeader>

            <CardBody>
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map(req => (
                    <CollaborationRequestCard
                      key={req.id}
                      request={req}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <p>No requests</p>
              )}
            </CardBody>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* CONFIRMED MEETINGS */}
          <Card className="bg-white border border-gray-200 shadow-sm">
  <CardHeader>
    <h2 className="text-lg font-semibold">Confirmed Meetings</h2>
  </CardHeader>

  <CardBody>
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
  </CardBody>
</Card>

          {/* RECOMMENDED INVESTORS */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Recommended Investors</h2>
            </CardHeader>

            <CardBody className="space-y-4">
              {recommendedInvestors.map(inv => (
                <InvestorCard key={inv.id} investor={inv} showActions={false} />
              ))}
            </CardBody>
          </Card>

        </div>
      </div>
    </div>
  );
};