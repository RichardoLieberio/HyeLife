import { ArrowLeft, Search, ShoppingCart, Plus, Minus, Trash2, MapPin, Building2, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import type { Page } from '../page.tsx';



interface PharmacyPageProps {
  onNavigate: (page: Page) => void;
}

interface Product {
  name: string;
  type: string;
  price: number;
  unit: string;
  prescription: boolean;
}

export function PharmacyPage({ onNavigate }: PharmacyPageProps) {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [step, setStep] = useState<'browse' | 'location' | 'payment'>('browse');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ovo');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      name: 'Paracetamol 500mg',
      type: 'Obat Bebas',
      price: 15000,
      unit: 'strip (10 tablet)',
      prescription: false
    },
    {
      name: 'Amoxicillin 500mg',
      type: 'Obat Keras',
      price: 35000,
      unit: 'strip (10 kapsul)',
      prescription: true
    },
    {
      name: 'Vitamin C 1000mg',
      type: 'Suplemen',
      price: 25000,
      unit: 'botol (30 tablet)',
      prescription: false
    },
    {
      name: 'Antasida DOEN',
      type: 'Obat Bebas',
      price: 18000,
      unit: 'botol (100ml)',
      prescription: false
    },
    {
      name: 'Omeprazole 20mg',
      type: 'Obat Keras',
      price: 45000,
      unit: 'strip (10 kapsul)',
      prescription: true
    },
    {
      name: 'Betadine 60ml',
      type: 'Obat Luar',
      price: 28000,
      unit: 'botol',
      prescription: false
    },
    {
      name: 'Cetirizine 10mg',
      type: 'Obat Keras',
      price: 12000,
      unit: 'strip (10 tablet)',
      prescription: true
    },
    {
      name: 'Sangobion',
      type: 'Suplemen',
      price: 32000,
      unit: 'strip (10 kapsul)',
      prescription: false
    }
  ];

  const addToCart = (index: number) => {
    setCart({ ...cart, [index]: (cart[index] || 0) + 1 });
  };

  const removeFromCart = (index: number) => {
    if (cart[index] > 0) {
      const newCart = { ...cart };
      if (newCart[index] === 1) {
        delete newCart[index];
      } else {
        newCart[index]--;
      }
      setCart(newCart);
    }
  };

  const deleteFromCart = (index: number) => {
    const newCart = { ...cart };
    delete newCart[index];
    setCart(newCart);
  };

  const clearCart = () => {
    setCart({});
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [index, qty]) => {
      return sum + (products[parseInt(index)].price * qty);
    }, 0);
  };

  const hasPrescritionItems = () => {
    return Object.keys(cart).some(index => products[parseInt(index)].prescription);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = () => {
    if (getTotalItems() === 0) return;
    setIsCartOpen(false);
    setStep('location');
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = () => {
    if (hasPrescritionItems() && !prescriptionFile) {
      alert('Mohon upload resep dokter untuk obat yang memerlukan resep.');
      return;
    }
    alert(`Pembayaran via ${paymentMethod.toUpperCase()} berhasil! Obat akan dikirim ke alamat Anda.`);
    setCart({});
    setPrescriptionFile(null);
    setStep('browse');
    onNavigate('home');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescriptionFile(e.target.files[0]);
    }
  };

  if (step === 'location') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-6 rounded-b-3xl">
          <div className="flex items-center mb-4">
            <button onClick={() => setStep('browse')} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-white">Alamat Pengiriman</h1>
          </div>
          <p className="text-emerald-100 text-sm">Obat akan dikirim dalam 1-2 jam</p>
        </div>

        <div className="px-6 py-6">
          <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
            <h2 className="text-gray-800 mb-4">Lokasi Pengiriman</h2>
            
            <form onSubmit={handleLocationSubmit} className="space-y-4">
              {/* Map Section */}
              <div className="space-y-2">
                <Label>Pilih Lokasi di Peta</Label>
                <div className="w-full h-64 rounded-lg border-2 border-gray-200 overflow-hidden relative bg-emerald-50">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-100">
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid-pharmacy" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pharmacy)" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <MapPin className="h-12 w-12 text-emerald-600 drop-shadow-lg animate-bounce" fill="#10b981" />
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button type="button" className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">+</span>
                      </button>
                      <button type="button" className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">−</span>
                      </button>
                    </div>
                    <button type="button" className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Geser peta untuk memilih lokasi yang tepat</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Atau masukkan alamat manual</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Jl. Sudirman No. 123"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Lanjutkan ke Pembayaran
              </Button>
            </form>
          </Card>

          {hasPrescritionItems() && (
            <div className="mt-6 bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-emerald-800 text-sm">
                ⚕️ <span>Obat resep memerlukan resep dokter. Upload resep saat checkout.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-6 rounded-b-3xl">
          <div className="flex items-center mb-4">
            <button onClick={() => setStep('location')} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-white">Pembayaran</h1>
          </div>
          <p className="text-emerald-100 text-sm">Konfirmasi pesanan Anda</p>
        </div>

        <div className="px-6 py-6">
          {/* Prescription Upload */}
          {hasPrescritionItems() && (
            <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
              <h2 className="text-gray-800 mb-4">Upload Resep Dokter</h2>
              <p className="text-gray-600 text-sm mb-4">
                Pesanan Anda mengandung obat yang memerlukan resep dokter. Silakan upload resep Anda.
              </p>
              
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                  <input
                    type="file"
                    id="prescription"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="prescription" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-1">Klik untuk upload resep</p>
                    <p className="text-gray-400 text-sm">JPG, PNG atau PDF (Max 5MB)</p>
                  </label>
                </div>

                {prescriptionFile && (
                  <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 rounded p-2">
                        <Upload className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm">{prescriptionFile.name}</p>
                        <p className="text-gray-500 text-xs">{(prescriptionFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPrescriptionFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Payment Method */}
          <Card className="p-5 bg-white border border-gray-100 shadow-sm mb-6">
            <h2 className="text-gray-800 mb-4">Metode Pembayaran</h2>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-emerald-500 transition-colors cursor-pointer ${paymentMethod === 'ovo' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
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

              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-emerald-500 transition-colors cursor-pointer ${paymentMethod === 'dana' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
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

              <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-emerald-500 transition-colors cursor-pointer ${paymentMethod === 'bank' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-7 w-7 text-emerald-600" />
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
              {Object.entries(cart).map(([index, qty]) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{products[parseInt(index)].name} x{qty}</span>
                  <span className="text-gray-800">Rp {(products[parseInt(index)].price * qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-gray-600">Alamat</span>
                <span className="text-gray-800 text-right max-w-[60%]">{address}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-800">Total Pembayaran</span>
                <span className="text-emerald-600">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
              </div>
            </div>
          </Card>

          <Button 
            onClick={handlePaymentSubmit}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Konfirmasi Pembayaran
          </Button>

          {hasPrescritionItems() && (
            <div className="mt-6 bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-emerald-800 text-sm">
                ⚕️ <span>Obat resep memerlukan resep dokter. Upload resep saat checkout.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-white">Apotek</h1>
          </div>
          
          {/* Cart Icon with Sheet */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button className="relative">
                <ShoppingCart className="h-6 w-6 text-white" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Keranjang Belanja</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {getTotalItems() === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Keranjang Anda kosong</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {Object.entries(cart).map(([index, qty]) => {
                        const product = products[parseInt(index)];
                        return (
                          <Card key={index} className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <h4 className="text-gray-800 mb-1">{product.name}</h4>
                                {product.prescription && (
                                  <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200 mb-2">
                                    Resep Dokter
                                  </Badge>
                                )}
                                <p className="text-emerald-600">Rp {product.price.toLocaleString('id-ID')}</p>
                              </div>
                              <button
                                onClick={() => deleteFromCart(parseInt(index))}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => removeFromCart(parseInt(index))}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-gray-800 w-8 text-center">{qty}</span>
                                <Button 
                                  size="sm" 
                                  className="h-8 w-8 p-0 bg-emerald-600 hover:bg-emerald-700"
                                  onClick={() => addToCart(parseInt(index))}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-gray-600">Rp {(product.price * qty).toLocaleString('id-ID')}</p>
                            </div>
                          </Card>
                        );
                      })}
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-800">Total</span>
                        <span className="text-emerald-600">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                      </div>
                      <Button
                        onClick={clearCart}
                        variant="outline"
                        className="w-full mb-3 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Hapus Semua
                      </Button>
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                      >
                        Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <p className="text-emerald-100 text-sm">Obat dikirim ke rumah dalam 1-2 jam</p>
      </div>

      <div className="px-6 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari obat atau suplemen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent">
          {['Semua', 'Obat Bebas', 'Obat Keras', 'Suplemen', 'Obat Luar'].map((category, index) => (
            <Badge 
              key={index}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === category ? 'bg-emerald-600' : 'hover:bg-emerald-50'
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Products */}
        <div className="space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada produk ditemukan</p>
            </div>
          ) : (
            filteredProducts.map((product, originalIndex) => {
              const index = products.indexOf(product);
              return (
                <Card key={index} className="p-4 bg-white border border-gray-100 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-800 mb-1">{product.name}</h3>
                          <div className="flex gap-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                product.prescription 
                                  ? 'bg-red-50 text-red-700 border-red-200' 
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              {product.type}
                            </Badge>
                            {product.prescription && (
                              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                Perlu Resep
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">{product.unit}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-600">Rp {product.price.toLocaleString('id-ID')}</p>
                        </div>
                        
                        {cart[index] ? (
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => removeFromCart(index)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-gray-800 w-8 text-center">{cart[index]}</span>
                            <Button 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-emerald-600 hover:bg-emerald-700"
                              onClick={() => addToCart(index)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => addToCart(index)}
                          >
                            Tambah
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        <div className="mt-6 bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <p className="text-emerald-800 text-sm">
            ⚕️ <span>Obat resep memerlukan resep dokter. Upload resep saat checkout.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
