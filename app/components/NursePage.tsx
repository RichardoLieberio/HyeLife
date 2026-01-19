import { ArrowLeft, MapPin, Building2, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import type { Page } from '../page.tsx';


import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';

interface NursePageProps {
  onNavigate: (page: Page) => void;
}

export function NursePage({ onNavigate }: NursePageProps) {
  const [step, setStep] = useState<'location' | 'payment'>('location');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ovo');

  const basePrice = 300000;
  
  const getDays = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end date
    return diffDays;
  };

  const calculateTotal = () => {
    return basePrice * getDays();
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = () => {
    alert(`Pembayaran via ${paymentMethod.toUpperCase()} berhasil! Perawat akan segera menuju lokasi Anda.`);
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => {
              if (step === 'payment') setStep('location');
              else onNavigate('home');
            }} 
            className="mr-4"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-white">Sewa Perawat</h1>
        </div>
        <p className="text-purple-100 text-sm">Perawat profesional untuk merawat orang tersayang</p>
      </div>

      <div className="px-6 py-6">
        {step === 'location' ? (
          <>
            {/* Location Form */}
            <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
              <h2 className="text-gray-800 mb-4">Lokasi Perawatan</h2>
              
              <form onSubmit={handleLocationSubmit} className="space-y-4">
                {/* Map Section */}
                <div className="space-y-2">
                  <Label>Pilih Lokasi di Peta</Label>
                  <div className="w-full h-64 rounded-lg border-2 border-gray-200 overflow-hidden relative bg-purple-50">
                    {/* Mock Map */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100">
                      <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id="grid-nurse" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#a855f7" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid-nurse)" />
                        </svg>
                      </div>
                      {/* Location Pin */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <MapPin className="h-12 w-12 text-purple-600 drop-shadow-lg animate-bounce" fill="#a855f7" />
                      </div>
                      {/* Map Controls */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button 
                          type="button"
                          className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-700">+</span>
                        </button>
                        <button 
                          type="button"
                          className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-700">−</span>
                        </button>
                      </div>
                      {/* Current Location Button */}
                      <button 
                        type="button"
                        className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                      >
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Geser peta untuk memilih lokasi yang tepat</p>
                </div>

                {/* Address Input */}
                <div className="space-y-2">
                  <Label htmlFor="address">Atau masukkan alamat manual</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Jl. Sudirman No. 123"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Lanjutkan ke Pembayaran
                </Button>
              </form>
            </Card>
          </>
        ) : (
          <>
            {/* Date Range Selection */}
            <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
              <h2 className="text-gray-800 mb-4">Pilih Tanggal Layanan</h2>
              
              {/* Date Range Picker */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    locale={id}
                    className="rounded-lg"
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>

                {/* Selected Date Display */}
                {dateRange?.from && (
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-800">Tanggal Mulai:</span>
                      <span className="text-purple-900">{format(dateRange.from, 'dd MMMM yyyy', { locale: id })}</span>
                    </div>
                    {dateRange.to && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-purple-800">Tanggal Selesai:</span>
                          <span className="text-purple-900">{format(dateRange.to, 'dd MMMM yyyy', { locale: id })}</span>
                        </div>
                        <div className="border-t border-purple-200 mt-2 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-purple-800">Total Durasi:</span>
                            <span className="text-purple-900">{getDays()} hari</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Price Summary */}
              {getDays() > 0 && (
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <h3 className="text-gray-800 mb-3">Ringkasan Biaya</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Biaya per hari</span>
                      <span className="text-gray-800">Rp {basePrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Durasi</span>
                      <span className="text-gray-800">{getDays()} hari</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 mt-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">Total</span>
                      <span className="text-purple-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Payment Method */}
            <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
              <h2 className="text-gray-800 mb-4">Metode Pembayaran</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-purple-500 transition-colors cursor-pointer ${paymentMethod === 'ovo' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
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

                <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-purple-500 transition-colors cursor-pointer ${paymentMethod === 'dana' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
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

                <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-purple-500 transition-colors cursor-pointer ${paymentMethod === 'bank' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-purple-600" />
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
                {dateRange?.from && dateRange?.to && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Periode</span>
                    <span className="text-gray-800 text-right">
                      {format(dateRange.from, 'dd MMM', { locale: id })} - {format(dateRange.to, 'dd MMM yyyy', { locale: id })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durasi</span>
                  <span className="text-gray-800">{getDays()} hari</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Alamat</span>
                  <span className="text-gray-800 text-right max-w-[60%]">{address}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">Total Pembayaran</span>
                  <span className="text-purple-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handlePaymentSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={getDays() === 0}
            >
              Konfirmasi Pembayaran
            </Button>
          </>
        )}

        <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-100">
          <p className="text-purple-800 text-sm">
            ℹ️ <span>Perawat akan datang sesuai jadwal yang Anda pilih.</span>
          </p>
        </div>
      </div>
    </div>
  );
}