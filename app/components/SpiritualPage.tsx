import { ArrowLeft, Video, Users, Clock, Calendar, Search, Building2, User } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import type { Page } from '../page.tsx';



interface SpiritualPageProps {
  onNavigate: (page: Page) => void;
}

interface ReligiousExpert {
  name: string;
  title: string;
  religion: string;
  rating: number;
  price: string;
  priceNumber: number;
  available: boolean;
  image: string;
}

interface OnlineService {
  title: string;
  time: string;
  participants: string;
  date: string;
  religion: string;
  free: boolean;
  description: string;
  guide: string;
}

export function SpiritualPage({ onNavigate }: SpiritualPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('Semua');
  const [selectedServiceReligion, setSelectedServiceReligion] = useState('Semua');
  const [step, setStep] = useState<'browse' | 'booking'>('browse');
  const [selectedExpert, setSelectedExpert] = useState<ReligiousExpert | null>(null);
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow'>('today');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('ovo');
  const [selectedService, setSelectedService] = useState<OnlineService | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const religiousExperts: ReligiousExpert[] = [
    {
      name: 'Ustadz Ahmad Fathoni, Lc',
      title: 'Ahli Fiqih & Tafsir',
      religion: 'Islam',
      rating: 4.9,
      price: 'Rp 100.000',
      priceNumber: 100000,
      available: true,
      image: '🕌'
    },
    {
      name: 'Pendeta Robert Siahaan, M.Th',
      title: 'Konselor Rohani',
      religion: 'Kristen',
      rating: 4.8,
      price: 'Rp 100.000',
      priceNumber: 100000,
      available: true,
      image: '⛪'
    },
    {
      name: 'Pastor Michael Hartono',
      title: 'Pembimbing Spiritual',
      religion: 'Katolik',
      rating: 5.0,
      price: 'Rp 100.000',
      priceNumber: 100000,
      available: true,
      image: '✝️'
    },
    {
      name: 'Bhikkhu Dhammavaro',
      title: 'Guru Meditasi & Dharma',
      religion: 'Buddha',
      rating: 4.9,
      price: 'Rp 100.000',
      priceNumber: 100000,
      available: true,
      image: '☸️'
    }
  ];

  const onlineServices: OnlineService[] = [
    {
      title: 'Kajian Islam Online',
      time: 'Kamis - 19:00 WIB',
      participants: '150+ peserta',
      date: '13 November 2025',
      religion: 'Islam',
      free: true,
      description: 'Kajian Islam mendalam membahas tema-tema kehidupan sehari-hari dengan pendekatan Al-Quran dan Hadits. Diskusi interaktif dengan ustadz berpengalaman.',
      guide: 'Ustadz Ahmad Fathoni, Lc'
    },
    {
      title: 'Ibadah Minggu Online',
      time: 'Minggu - 08:00 WIB',
      participants: '200+ peserta',
      date: '16 November 2025',
      religion: 'Kristen',
      free: true,
      description: 'Ibadah Minggu online dengan khotbah inspiratif, pujian dan penyembahan bersama. Tersedia terjemahan dalam bahasa isyarat.',
      guide: 'Pendeta Robert Siahaan, M.Th'
    },
    {
      title: 'Misa Online',
      time: 'Minggu - 06:00 WIB',
      participants: '180+ peserta',
      date: '16 November 2025',
      religion: 'Katolik',
      free: true,
      description: 'Misa Kudus online dipimpin oleh pastor. Mengikuti liturgi gereja katolik dengan bacaan dan renungan harian.',
      guide: 'Pastor Michael Hartono'
    },
    {
      title: 'Meditasi Bersama',
      time: 'Sabtu - 06:00 WIB',
      participants: '100+ peserta',
      date: '15 November 2025',
      religion: 'Buddha',
      free: true,
      description: 'Sesi meditasi bersama untuk melatih kesadaran dan ketenangan pikiran. Dipandu oleh bhikkhu berpengalaman dengan teknik meditasi Vipassana.',
      guide: 'Bhikkhu Dhammavaro'
    }
  ];

  const todayTimeSlots = [
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const tomorrowTimeSlots = [
    '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const allReligions = ['Semua', 'Islam', 'Kristen', 'Katolik', 'Buddha'];

  const filteredExperts = religiousExperts.filter(expert => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesReligion = selectedReligion === 'Semua' || expert.religion === selectedReligion;
    
    return matchesSearch && matchesReligion;
  });

  const handleBooking = (expert: ReligiousExpert) => {
    setSelectedExpert(expert);
    setStep('booking');
  };

  const handlePaymentSubmit = () => {
    if (!selectedTime) {
      alert('Mohon pilih jam konsultasi');
      return;
    }
    const dayText = selectedDay === 'today' ? 'Hari Ini' : 'Besok';
    alert(`Pembayaran via ${paymentMethod.toUpperCase()} berhasil! Sesi konsultasi dengan ${selectedExpert?.name} pada ${dayText} pukul ${selectedTime} telah dikonfirmasi.`);
    setStep('browse');
    setSelectedExpert(null);
    setSelectedTime('');
    onNavigate('home');
  };

  const handleServiceClick = (service: OnlineService) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleJoinService = () => {
    if (selectedService) {
      alert(`Anda telah bergabung dengan ${selectedService.title}. Link akan dikirimkan melalui email sebelum acara dimulai.`);
      setShowServiceModal(false);
      setSelectedService(null);
    }
  };

  // Payment/Booking Page
  if (step === 'booking' && selectedExpert) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-6 rounded-b-3xl">
          <div className="flex items-center mb-4">
            <button onClick={() => setStep('browse')} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-white">Booking Konsultasi</h1>
          </div>
          <p className="text-orange-100 text-sm">Pilih waktu yang sesuai untuk Anda</p>
        </div>

        <div className="px-6 py-6">
          {/* Expert Info */}
          <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl flex-shrink-0">
                {selectedExpert.image}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-1">{selectedExpert.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedExpert.title}</p>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {selectedExpert.religion}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Day Selection */}
          <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
            <h2 className="text-gray-800 mb-4">Pilih Hari</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => {
                  setSelectedDay('today');
                  setSelectedTime('');
                }}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedDay === 'today'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <p className="text-gray-800">Hari Ini</p>
                <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
              </button>
              <button
                onClick={() => {
                  setSelectedDay('tomorrow');
                  setSelectedTime('');
                }}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedDay === 'tomorrow'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <p className="text-gray-800">Besok</p>
                <p className="text-gray-500 text-sm">
                  {new Date(Date.now() + 86400000).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </p>
              </button>
            </div>

            {/* Time Selection */}
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-gray-800 mb-3">Pilih Jam</h3>
              <div className="grid grid-cols-4 gap-2">
                {(selectedDay === 'today' ? todayTimeSlots : tomorrowTimeSlots).map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      selectedTime === time
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 bg-white hover:border-orange-300 text-gray-700'
                    }`}
                  >
                    <p className="text-sm">{time}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Time Display */}
            {selectedTime && (
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-orange-800">Waktu yang dipilih:</span>
                  <span className="text-orange-900">
                    {selectedDay === 'today' ? 'Hari Ini' : 'Besok'}, {selectedTime}
                  </span>
                </div>
              </div>
            )}
          </Card>

          {/* Payment Method */}
          <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
            <h2 className="text-gray-800 mb-4">Metode Pembayaran</h2>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-orange-500 transition-colors cursor-pointer ${paymentMethod === 'ovo' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="ovo" id="ovo" />
                <Label htmlFor="ovo" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-lg overflow-hidden flex items-center justify-center">
                      <img src={'/Ovo.jpeg'} alt="OVO" className="h-12 w-12 object-cover" />
                    </div>
                    <div>
                      <p className="ml-4 text-gray-800">OVO</p>
                    </div>
                  </div>
                </Label>
              </div>

              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-orange-500 transition-colors cursor-pointer ${paymentMethod === 'dana' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="dana" id="dana" />
                <Label htmlFor="dana" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-lg overflow-hidden flex items-center justify-center">
                      <img src={'/Dana.jpeg'} alt="DANA" className="h-12 w-12 object-cover" />
                    </div>
                    <div>
                      <p className="ml-4 text-gray-800">Dana</p>
                    </div>
                  </div>
                </Label>
              </div>

              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-orange-500 transition-colors cursor-pointer ${paymentMethod === 'bank' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-7 w-7 text-orange-600" />
                    </div>
                    <div>
                      <p className="ml-4 text-gray-800">Transfer Bank</p>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Order Summary */}
          <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
            <h3 className="text-gray-800 mb-3">Ringkasan Pesanan</h3>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ahli Spiritual</span>
                <span className="text-gray-800">{selectedExpert.name}</span>
              </div>
              {selectedTime && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Waktu</span>
                  <span className="text-gray-800">
                    {selectedDay === 'today' ? 'Hari Ini' : 'Besok'}, {selectedTime}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Durasi</span>
                <span className="text-gray-800">1 jam</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-800">Total Pembayaran</span>
                <span className="text-orange-600">Rp {selectedExpert.priceNumber.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </Card>

          <Button 
            onClick={handlePaymentSubmit}
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={!selectedTime}
          >
            Konfirmasi Pembayaran
          </Button>

          <div className="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-100">
            <p className="text-orange-800 text-sm">
              🙏 <span>Link video call akan dikirimkan 15 menit sebelum sesi dimulai. Pastikan koneksi internet Anda stabil.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <button onClick={() => onNavigate('home')} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-white">Layanan Spiritual</h1>
        </div>
        <p className="text-orange-100 text-sm">Bimbingan rohani & ibadah bersama</p>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="consultation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="consultation">Konsultasi</TabsTrigger>
            <TabsTrigger value="services">Ibadah Online</TabsTrigger>
          </TabsList>

          <TabsContent value="consultation">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari ahli agama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Religion Filters */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent">
              {allReligions.map((religion, index) => (
                <Badge 
                  key={index}
                  variant={selectedReligion === religion ? 'default' : 'outline'}
                  onClick={() => setSelectedReligion(religion)}
                  className={`cursor-pointer whitespace-nowrap ${
                    selectedReligion === religion ? 'bg-orange-600' : 'hover:bg-orange-50'
                  }`}
                >
                  {religion}
                </Badge>
              ))}
            </div>

            {/* Religious Expert List */}
            <div className="space-y-4">
              {filteredExperts.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada ahli agama ditemukan</p>
                </div>
              ) : (
                filteredExperts.map((expert, index) => (
                  <Card key={index} className="p-4 bg-white border border-gray-100 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl flex-shrink-0">
                        {expert.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-800 mb-1">{expert.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{expert.title}</p>
                        
                        <Badge variant="outline" className="mb-3 bg-orange-50 text-orange-700 border-orange-200">
                          {expert.religion}
                        </Badge>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-orange-600">
                              {expert.price}
                              <span className="ml-1 text-gray-500 text-xs">per jam</span>
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            disabled={!expert.available}
                            className={expert.available ? 'bg-orange-600 hover:bg-orange-700' : ''}
                            onClick={() => handleBooking(expert)}
                          >
                            {expert.available ? 'Booking' : 'Tidak Tersedia'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="services">
            {/* Religion Filters */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent">
              {allReligions.map((religion, index) => (
                <Badge 
                  key={index}
                  variant={selectedServiceReligion === religion ? 'default' : 'outline'}
                  onClick={() => setSelectedServiceReligion(religion)}
                  className={`cursor-pointer whitespace-nowrap ${
                    selectedServiceReligion === religion ? 'bg-orange-600' : 'hover:bg-orange-50'
                  }`}
                >
                  {religion}
                </Badge>
              ))}
            </div>

            {/* Online Services List */}
            <div className="space-y-4">
              {onlineServices.filter(service => selectedServiceReligion === 'Semua' || service.religion === selectedServiceReligion).map((service, index) => (
                <Card key={index} className="p-4 bg-white border border-gray-100 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-gray-800 mb-2">{service.title}</h3>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 mb-3">
                        {service.religion}
                      </Badge>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {service.guide}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {service.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {service.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {service.participants}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleServiceClick(service)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Bergabung
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-100">
          <p className="text-orange-800 text-sm">
            🙏 <span>Layanan spiritual tersedia untuk berbagai agama. Semua konsultasi bersifat pribadi dan rahasia.</span>
          </p>
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedService?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {selectedService?.religion}
              </Badge>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>{selectedService?.guide}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{selectedService?.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>{selectedService?.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{selectedService?.participants}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-800 mb-2">Deskripsi</h4>
              <p className="text-gray-600 text-sm">{selectedService?.description}</p>
            </div>

            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={handleJoinService}
            >
              <Video className="h-4 w-4 mr-2" />
              Bergabung
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}