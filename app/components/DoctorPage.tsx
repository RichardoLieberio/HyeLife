import { ArrowLeft, MapPin, Building2 } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { Page } from '../page.tsx';



interface DoctorPageProps {
  onNavigate: (page: Page) => void;
}

export function DoctorPage({ onNavigate }: DoctorPageProps) {
  const [step, setStep] = useState<'location' | 'payment'>('location');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ovo');
  const [useMap, setUseMap] = useState(true);

  const basePrice = 100000;

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = () => {
    alert(`Pembayaran via ${paymentMethod.toUpperCase()} berhasil! Dokter akan segera menuju lokasi Anda.`);
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <button onClick={() => step === 'payment' ? setStep('location') : onNavigate('home')} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-white">Panggil Dokter</h1>
        </div>
        <p className="text-sky-100 text-sm">Dokter datang ke rumah Anda sesegera mungkin</p>
      </div>

      <div className="px-6 py-6">
        {step === 'location' ? (
          <>
            {/* Location Form */}
            <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
              <h2 className="text-gray-800 mb-4">Lokasi Kunjungan</h2>
              
              <form onSubmit={handleLocationSubmit} className="space-y-4">
                {/* Map Section */}
                <div className="space-y-2">
                  <Label>Pilih Lokasi di Peta</Label>
                  <div className="w-full h-64 rounded-lg border-2 border-gray-200 overflow-hidden relative bg-sky-50">
                    {/* Mock Map */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-100">
                      <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0ea5e9" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                      </div>
                      {/* Location Pin */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <MapPin className="h-12 w-12 text-sky-600 drop-shadow-lg animate-bounce" fill="#0ea5e9" />
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
                        <MapPin className="h-5 w-5 text-sky-600" />
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
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                  Lanjutkan ke Pembayaran
                </Button>
              </form>
            </Card>
          </>
        ) : (
          <>
            {/* Payment Method */}
            <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
              <h2 className="text-gray-800 mb-4">Metode Pembayaran</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-sky-500 transition-colors cursor-pointer ${paymentMethod === 'ovo' ? 'border-sky-500 bg-sky-50' : 'border-gray-200'}`}>
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

                <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-sky-500 transition-colors cursor-pointer ${paymentMethod === 'dana' ? 'border-sky-500 bg-sky-50' : 'border-gray-200'}`}>
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

                <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-sky-500 transition-colors cursor-pointer ${paymentMethod === 'bank' ? 'border-sky-500 bg-sky-50' : 'border-gray-200'}`}>
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 bg-sky-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-sky-600" />
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
                  <span className="text-gray-600">Alamat</span>
                  <span className="text-gray-800 text-right max-w-[60%]">{address}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Biaya Kunjungan</span>
                  <span className="text-gray-800">Rp {basePrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">Total Pembayaran</span>
                  <span className="text-sky-600">Rp {basePrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handlePaymentSubmit}
              className="w-full bg-sky-600 hover:bg-sky-700"
            >
              Konfirmasi Pembayaran
            </Button>
          </>
        )}

        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-blue-800 text-sm">
            ℹ️ <span>Layanan tersedia 24/7. Dokter akan datang ke lokasi Anda sesegera mungkin setelah konfirmasi.</span>
          </p>
        </div>
      </div>
    </div>
  );
}