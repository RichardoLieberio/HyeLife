import { ArrowLeft, Calendar, Clock, MapPin, MessageCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { Page } from '../page.tsx';

interface AppointmentsPageProps {
  onNavigate: (page: Page) => void;
}

export function AppointmentsPage({ onNavigate }: AppointmentsPageProps) {
  const handleChat = (appointmentName: string) => {
    alert(`Membuka chat dengan ${appointmentName}`);
  };

  const appointments = {
    upcoming: [
      {
        type: 'Dokter',
        name: 'Dr. Sarah Wijaya, Sp.PD',
        date: 'Hari ini',
        time: '',
        location: 'Kunjungan Rumah',
        status: 'confirmed'
      },
      {
        type: 'Psikolog',
        name: 'Psikolog Amanda Putri, M.Psi',
        date: '16 November 2025',
        time: 'Minggu - 14:00 WIB',
        location: 'Video Call',
        status: 'confirmed'
      }
    ],
    ongoing: [
      {
        type: 'Perawat',
        name: 'Ns. Maria Christina',
        date: '12-19 November 2025',
        time: '',
        location: 'Perawatan di Rumah',
        status: 'ongoing'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-sky-100 text-sky-700';
      case 'ongoing':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Terkonfirmasi';
      case 'ongoing':
        return 'Sedang Berlangsung';
      default:
        return status;
    }
  };

  const renderAppointment = (appointment: any) => (
    <Card className="p-4 bg-white border border-gray-100 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Badge className={`${getStatusColor(appointment.status)} mb-2`}>
            {appointment.type}
          </Badge>
          <h3 className="text-gray-800 mb-1">{appointment.name}</h3>
        </div>
        <Badge variant="outline" className={getStatusColor(appointment.status)}>
          {getStatusText(appointment.status)}
        </Badge>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {appointment.date}
        </div>
        {!!appointment.time && (
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {appointment.time}
          </div>
        )}
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {appointment.location}
        </div>
      </div>
      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleChat(appointment.name)}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <button onClick={() => onNavigate('home')} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-white">Appointment</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Mendatang</TabsTrigger>
            <TabsTrigger value="ongoing">Berlangsung</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {appointments.upcoming.length > 0 ? (
              appointments.upcoming.map((apt, index) => (
                <div key={index}>{renderAppointment(apt)}</div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada appointment mendatang</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ongoing">
            {appointments.ongoing.length > 0 ? (
              appointments.ongoing.map((apt, index) => (
                <div key={index}>{renderAppointment(apt)}</div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada appointment berlangsung</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}