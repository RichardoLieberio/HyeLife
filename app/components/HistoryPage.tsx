import { ArrowLeft, Calendar, Star, Flag } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Page } from '../page.tsx';

interface HistoryPageProps {
  onNavigate: (page: Page) => void;
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const [selectedFilter, setSelectedFilter] = useState('Semua');

  const handleRating = (id: string, service: string) => {
    alert(`Memberikan rating untuk ${service}`);
  };

  const handleReport = (id: string, service: string) => {
    alert(`Melaporkan transaksi ${id}: ${service}`);
  };

  const allFilters = ['Semua', 'Dokter', 'Perawat', 'Obat', 'Psikolog', 'Spiritual'];

  const history = [
    {
      id: 'TRX-001',
      type: 'Dokter',
      service: 'Dr. Sarah Wijaya, Sp.PD - Kunjungan Rumah',
      date: '10 November 2025',
      amount: 'Rp 350.000',
      status: 'completed',
      rated: false
    },
    {
      id: 'TRX-002',
      type: 'Obat',
      service: 'Pesanan Obat - 5 item',
      date: '10 November 2025',
      amount: 'Rp 125.000',
      status: 'completed',
      rated: true
    },
    {
      id: 'TRX-003',
      type: 'Psikolog',
      service: 'Psikolog Amanda Putri - Sesi Konsultasi',
      date: '8 November 2025',
      amount: 'Rp 200.000',
      status: 'completed',
      rated: false
    },
    {
      id: 'TRX-004',
      type: 'Perawat',
      service: 'Ns. Maria Christina - Perawatan Lansia (7 hari)',
      date: '1-7 November 2025',
      amount: 'Rp 1.750.000',
      status: 'completed',
      rated: true
    },
    {
      id: 'TRX-005',
      type: 'Spiritual',
      service: 'Konsultasi Ustadz Ahmad',
      date: '5 November 2025',
      amount: 'Rp 100.000',
      status: 'completed',
      rated: false
    },
    {
      id: 'TRX-006',
      type: 'Dokter',
      service: 'Dr. Budi Santoso, Sp.A - Kunjungan Rumah',
      date: '3 November 2025',
      amount: 'Rp 300.000',
      status: 'completed',
      rated: true
    }
  ];

  const filteredHistory = history.filter(item => 
    selectedFilter === 'Semua' || item.type === selectedFilter
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Dokter':
        return 'bg-blue-100 text-blue-700';
      case 'Perawat':
        return 'bg-purple-100 text-purple-700';
      case 'Obat':
        return 'bg-emerald-100 text-emerald-700';
      case 'Psikolog':
        return 'bg-pink-100 text-pink-700';
      case 'Spiritual':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <button onClick={() => onNavigate('home')} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-white">Riwayat Transaksi</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Filter */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-transparent">
            {allFilters.map((filter, index) => (
              <Badge 
                key={index}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(filter)}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedFilter === filter ? 'bg-sky-600' : 'hover:bg-sky-50'
                }`}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="p-4 bg-white border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <Badge className={`${getTypeColor(item.type)} mb-2`}>
                    {item.type}
                  </Badge>
                  <h3 className="text-gray-800 mb-1">{item.service}</h3>
                  <p className="text-gray-500 text-sm">ID: {item.id}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.date}
                </div>
                <div className="text-sky-600">
                  <span>{item.amount}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                {!item.rated && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRating(item.id, item.service)}
                    className="flex-1"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Beri Rating
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReport(item.id, item.service)}
                  className={!item.rated ? 'flex-1' : 'w-full'}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Laporkan
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">Menampilkan semua riwayat transaksi</p>
        </div>
      </div>
    </div>
  );
}