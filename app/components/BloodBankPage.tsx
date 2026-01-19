import { ArrowLeft, MapPin, Droplet, Search } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Page } from '../page.tsx';


interface BloodBankPageProps {
  onNavigate: (page: Page) => void;
}

export function BloodBankPage({ onNavigate }: BloodBankPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('Semua');

  const allBloodTypes = ['Semua', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const bloodData = [
    {
      source: 'Palang Merah Indonesia - Jakarta Pusat',
      city: 'Jakarta',
      type: 'PMI',
      stocks: [
        { type: 'A+', quantity: 45, status: 'available' },
        { type: 'A-', quantity: 12, status: 'low' },
        { type: 'B+', quantity: 38, status: 'available' },
        { type: 'B-', quantity: 8, status: 'low' },
        { type: 'AB+', quantity: 15, status: 'available' },
        { type: 'AB-', quantity: 5, status: 'critical' },
        { type: 'O+', quantity: 52, status: 'available' },
        { type: 'O-', quantity: 18, status: 'available' }
      ]
    },
    {
      source: 'RS Cipto Mangunkusumo',
      city: 'Jakarta',
      type: 'Hospital',
      stocks: [
        { type: 'A+', quantity: 28, status: 'available' },
        { type: 'A-', quantity: 7, status: 'low' },
        { type: 'B+', quantity: 22, status: 'available' },
        { type: 'B-', quantity: 4, status: 'critical' },
        { type: 'AB+', quantity: 11, status: 'available' },
        { type: 'AB-', quantity: 3, status: 'critical' },
        { type: 'O+', quantity: 35, status: 'available' },
        { type: 'O-', quantity: 9, status: 'low' }
      ]
    },
    {
      source: 'RS Fatmawati',
      city: 'Jakarta',
      type: 'Hospital',
      stocks: [
        { type: 'A+', quantity: 33, status: 'available' },
        { type: 'A-', quantity: 10, status: 'available' },
        { type: 'B+', quantity: 25, status: 'available' },
        { type: 'B-', quantity: 6, status: 'low' },
        { type: 'AB+', quantity: 14, status: 'available' },
        { type: 'AB-', quantity: 4, status: 'critical' },
        { type: 'O+', quantity: 41, status: 'available' },
        { type: 'O-', quantity: 12, status: 'available' }
      ]
    },
    {
      source: 'Palang Merah Indonesia - Tangerang',
      city: 'Tangerang',
      type: 'PMI',
      stocks: [
        { type: 'A+', quantity: 38, status: 'available' },
        { type: 'A-', quantity: 9, status: 'low' },
        { type: 'B+', quantity: 31, status: 'available' },
        { type: 'B-', quantity: 7, status: 'low' },
        { type: 'AB+', quantity: 13, status: 'available' },
        { type: 'AB-', quantity: 6, status: 'low' },
        { type: 'O+', quantity: 44, status: 'available' },
        { type: 'O-', quantity: 15, status: 'available' }
      ]
    }
  ];

  const filteredBloodData = bloodData.filter(location => {
    const matchesSearch = 
      location.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBloodType = selectedBloodType === 'Semua' || 
      location.stocks.some(stock => stock.type === selectedBloodType);
    
    return matchesSearch && matchesBloodType;
  });

  const getStockStatus = (status: string) => {
    switch (status) {
      case 'available':
        return { color: 'bg-emerald-100 text-emerald-700', label: 'Tersedia' };
      case 'low':
        return { color: 'bg-yellow-100 text-yellow-700', label: 'Terbatas' };
      case 'critical':
        return { color: 'bg-red-100 text-red-700', label: 'Kritis' };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: 'Tidak Tersedia' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-white">Bank Darah</h1>
          </div>
          <img src={'/Media.png'} alt="HyeLife" className="h-10" />
        </div>
        <p className="text-red-100 text-sm">Informasi stok darah terkini dari berbagai sumber</p>
      </div>

      <div className="px-6 py-6">
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari rumah sakit atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Blood Type Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent">
            {allBloodTypes.map((bloodType, index) => (
              <Badge 
                key={index}
                variant={selectedBloodType === bloodType ? 'default' : 'outline'}
                onClick={() => setSelectedBloodType(bloodType)}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedBloodType === bloodType ? 'bg-emerald-600' : 'hover:bg-emerald-50'
                }`}
              >
                {bloodType}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredBloodData.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada data ditemukan</p>
            </div>
          ) : (
            filteredBloodData.map((location, index) => (
              <Card key={index} className="p-5 bg-white border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-emerald-500 mr-2" />
                      <h3 className="text-gray-800">{location.source}</h3>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      {location.type === 'PMI' ? 'Palang Merah Indonesia' : 'Rumah Sakit'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {location.stocks.map((stock, stockIndex) => {
                    const statusInfo = getStockStatus(stock.status);
                    return (
                      <div 
                        key={stockIndex}
                        className={`${statusInfo.color} rounded-lg p-3 text-center`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          <Droplet className="h-4 w-4 mr-1" />
                          <span className="font-semibold">{stock.type}</span>
                        </div>
                        <p className="text-xl mb-1">{stock.quantity}</p>
                        <p className="text-xs">{statusInfo.label}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-100">
          <p className="text-red-800 text-sm">
            💡 <span>Data diperbarui setiap 2 jam. Hubungi sumber langsung untuk informasi lebih lanjut atau untuk melakukan donor darah.</span>
          </p>
        </div>
      </div>
    </div>
  );
}