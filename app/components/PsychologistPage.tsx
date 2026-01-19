import { ArrowLeft, Star, Search, Building2 } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { Page } from '../page.tsx';



interface PsychologistPageProps {
  onNavigate: (page: Page) => void;
}

interface Psychologist {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  available: boolean;
  topics: string[];
  image: string;
}

export function PsychologistPage({ onNavigate }: PsychologistPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Semua');
  const [step, setStep] = useState<'browse' | 'booking'>('browse');
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow'>('today');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('ovo');

  const psychologists: Psychologist[] = [
    {
      name: 'Amanda Putri, M.Psi',
      specialty: 'Psikolog Klinis Dewasa',
      rating: 4.9,
      reviews: 145,
      price: 200000,
      available: true,
      topics: ['Kecemasan', 'Depresi', 'Stress'],
      image: '👩‍⚕️'
    },
    {
      name: 'Dimas Kurniawan, M.Psi',
      specialty: 'Psikolog Anak & Remaja',
      rating: 4.8,
      reviews: 98,
      price: 225000,
      available: true,
      topics: ['Kesulitan Belajar', 'Perilaku', 'Emosi'],
      image: '👨‍⚕️'
    },
    {
      name: 'Dr. Ratna Sari, M.Psi',
      specialty: 'Psikolog Keluarga & Pernikahan',
      rating: 5.0,
      reviews: 167,
      price: 250000,
      available: true,
      topics: ['Hubungan', 'Komunikasi', 'Konflik'],
      image: '👩‍⚕️'
    },
    {
      name: 'Eko Prasetyo, M.Psi',
      specialty: 'Psikolog Karir & Organisasi',
      rating: 4.7,
      reviews: 89,
      price: 180000,
      available: true,
      topics: ['Karir', 'Burnout', 'Produktivitas'],
      image: '👨‍⚕️'
    },
    {
      name: 'Siti Nurhaliza, M.Psi',
      specialty: 'Psikolog Klinis Dewasa',
      rating: 4.8,
      reviews: 124,
      price: 210000,
      available: true,
      topics: ['Trauma', 'PTSD', 'Kecemasan'],
      image: '👩‍⚕️'
    },
    {
      name: 'Budi Santoso, M.Psi',
      specialty: 'Psikolog Kesehatan',
      rating: 4.6,
      reviews: 78,
      price: 195000,
      available: true,
      topics: ['Stress', 'Pola Hidup', 'Kesejahteraan'],
      image: '👨‍⚕️'
    }
  ];

  const todayTimeSlots = [
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const tomorrowTimeSlots = [
    '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const allTopics = ['Semua', 'Kecemasan', 'Depresi', 'Stress', 'Trauma', 'Hubungan', 'Karir', 'Burnout'];

  const filteredPsychologists = psychologists.filter(psychologist => {
    const matchesSearch = 
      psychologist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      psychologist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      psychologist.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTopic = selectedTopic === 'Semua' || psychologist.topics.includes(selectedTopic);
    
    return matchesSearch && matchesTopic;
  });

  const handleBooking = (psychologist: Psychologist) => {
    setSelectedPsychologist(psychologist);
    setStep('booking');
  };

  const handlePaymentSubmit = () => {
    if (!selectedTime) {
      alert('Mohon pilih jam konsultasi');
      return;
    }
    const dayText = selectedDay === 'today' ? 'Hari Ini' : 'Besok';
    alert(`Pembayaran via ${paymentMethod.toUpperCase()} berhasil! Sesi konsultasi dengan ${selectedPsychologist?.name} pada ${dayText} pukul ${selectedTime} telah dikonfirmasi.`);
    setStep('browse');
    setSelectedPsychologist(null);
    setSelectedTime('');
    onNavigate('home');
  };

  if (step === 'booking' && selectedPsychologist) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-6 py-6 rounded-b-3xl">
          <div className="flex items-center mb-4">
            <button onClick={() => setStep('browse')} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-white">Booking Konsultasi</h1>
          </div>
          <p className="text-pink-100 text-sm">Pilih waktu yang sesuai untuk Anda</p>
        </div>

        <div className="px-6 py-6">
          {/* Psychologist Info */}
          <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl flex-shrink-0">
                {selectedPsychologist.image}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-1">{selectedPsychologist.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedPsychologist.specialty}</p>
                <div className="flex items-center text-yellow-600 text-sm">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  <span>{selectedPsychologist.rating} ({selectedPsychologist.reviews})</span>
                </div>
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
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 bg-white hover:border-pink-300'
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
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 bg-white hover:border-pink-300'
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
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 bg-white hover:border-pink-300 text-gray-700'
                    }`}
                  >
                    <p className="text-sm">{time}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Time Display */}
            {selectedTime && (
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-100 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-pink-800">Waktu yang dipilih:</span>
                  <span className="text-pink-900">
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
              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-pink-500 transition-colors cursor-pointer ${paymentMethod === 'ovo' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}`}>
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

              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-pink-500 transition-colors cursor-pointer ${paymentMethod === 'dana' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}`}>
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

              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-pink-500 transition-colors cursor-pointer ${paymentMethod === 'bank' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-7 w-7 text-pink-600" />
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
                <span className="text-gray-600">Psikolog</span>
                <span className="text-gray-800">{selectedPsychologist.name}</span>
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
                <span className="text-pink-600">Rp {selectedPsychologist.price.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </Card>

          <Button 
            onClick={handlePaymentSubmit}
            className="w-full bg-pink-600 hover:bg-pink-700"
            disabled={!selectedTime}
          >
            Konfirmasi Pembayaran
          </Button>

          <div className="mt-6 bg-pink-50 rounded-lg p-4 border border-pink-100">
            <p className="text-pink-800 text-sm">
              💭 <span>Link video call akan dikirimkan 15 menit sebelum sesi dimulai. Pastikan koneksi internet Anda stabil.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-6 py-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <button onClick={() => onNavigate('home')} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-white">Konsultasi Psikolog</h1>
        </div>
        <p className="text-pink-100 text-sm">Sesi konsultasi online via video call</p>
      </div>

      <div className="px-6 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari psikolog atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Topic Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent">
          {allTopics.map((topic, index) => (
            <Badge 
              key={index}
              variant={selectedTopic === topic ? 'default' : 'outline'}
              onClick={() => setSelectedTopic(topic)}
              className={`cursor-pointer whitespace-nowrap ${
                selectedTopic === topic ? 'bg-pink-600' : 'hover:bg-pink-50'
              }`}
            >
              {topic}
            </Badge>
          ))}
        </div>

        {/* Psychologist List */}
        <div className="space-y-4">
          {filteredPsychologists.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada psikolog ditemukan</p>
            </div>
          ) : (
            filteredPsychologists.map((psychologist, index) => (
              <Card key={index} className="p-4 bg-white border border-gray-100 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl flex-shrink-0">
                    {psychologist.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-800 mb-1">{psychologist.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{psychologist.specialty}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {psychologist.topics.map((topic, topicIndex) => (
                        <Badge 
                          key={topicIndex}
                          variant="outline" 
                          className="text-xs bg-pink-50 text-pink-700 border-pink-200"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-3 mb-3 text-sm">
                      <div className="flex items-center text-yellow-600">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <span>{psychologist.rating} ({psychologist.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-pink-600">
                          Rp {psychologist.price.toLocaleString('id-ID')}
                          <span className="ml-1 text-gray-500 text-xs">per jam</span>
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={!psychologist.available}
                        className={psychologist.available ? 'bg-pink-600 hover:bg-pink-700' : ''}
                        onClick={() => handleBooking(psychologist)}
                      >
                        {psychologist.available ? 'Booking' : 'Tidak Tersedia'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-6 bg-pink-50 rounded-lg p-4 border border-pink-100">
          <p className="text-pink-800 text-sm">
            💭 <span>Semua sesi bersifat rahasia dan profesional.</span>
          </p>
        </div>
      </div>
    </div>
  );
}