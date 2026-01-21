import { Phone, Stethoscope, Users, Pill, Brain, Heart, Droplet, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import type { Page } from '../page.tsx';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    { icon: Stethoscope, label: 'Dokter', color: 'bg-blue-100 text-blue-600', page: 'doctor' as Page },
    { icon: Users, label: 'Perawat', color: 'bg-purple-100 text-purple-600', page: 'nurse' as Page },
    { icon: Pill, label: 'Apotek', color: 'bg-emerald-100 text-emerald-600', page: 'pharmacy' as Page },
    { icon: Brain, label: 'Psikolog', color: 'bg-pink-100 text-pink-600', page: 'psychologist' as Page },
    { icon: Heart, label: 'Spiritual', color: 'bg-orange-100 text-orange-600', page: 'spiritual' as Page },
    { icon: Droplet, label: 'Bank Darah', color: 'bg-red-100 text-red-600', page: 'blood-bank' as Page },
  ];

  const newsArticles = [
    {
      title: 'Pentingnya Pemeriksaan Kesehatan Rutin untuk Mencegah Penyakit',
      date: '10 November 2025',
      image: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoJTIwbmV3c3xlbnwxfHx8fDE3NjI5MzQyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Tips Menjaga Kesehatan Mental di Era Modern',
      date: '8 November 2025',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGNhcmV8ZW58MXx8fHwxNzYyOTM0MjI1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Cara Merawat Lansia dengan Penuh Kasih Sayang',
      date: '5 November 2025',
      image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50fGVufDF8fHx8MTc2Mjg0OTk4MXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 pt-6 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <img src={'/Media.png'} alt="HyeLife" className="h-12" />
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white">👤</span>
          </div>
        </div>
        
        <div>
          <p className="text-sky-100">Selamat Datang,</p>
          <h1 className="text-white mt-1">John Doe</h1>
        </div>
      </div>

      <div className="px-6 pt-4">
        {/* Emergency Section - Minimalist */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-red-900">Darurat: 119 / 112</p>
              <p className="text-red-600 text-sm">Ambulans 24/7</p>
            </div>
          </div>
          <Button 
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => window.alert('Menghubungi ambulans...')}
          >
            Hubungi
          </Button>
        </div>

        {/* Services Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => onNavigate(service.page)}
                className="flex flex-col items-center"
              >
                <div className={`${service.color} h-14 w-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <span className="text-gray-700 text-xs text-center">{service.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* News Section */}
        <div className="mb-6">
          <h2 className="text-gray-800 mb-4">Berita Kesehatan</h2>
          <div className="space-y-3">
            {newsArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex">
                  <ImageWithFallback 
                    src={article.image}
                    alt={article.title}
                    className="w-24 h-24 object-cover flex-shrink-0"
                  />
                  <div className="p-3 flex-1">
                    <h3 className="text-gray-800 text-sm mb-2 line-clamp-2">{article.title}</h3>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}