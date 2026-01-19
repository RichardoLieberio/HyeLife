import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, User, Phone, Shield, CheckCircle2, Heart } from 'lucide-react';


interface RegisterPageProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Decorative Medical Icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <Heart className="absolute top-20 right-40 w-16 h-16 text-white animate-pulse" />
        <Shield className="absolute bottom-32 left-32 w-20 h-20 text-white" />
        <CheckCircle2 className="absolute top-1/2 right-20 w-12 h-12 text-white animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo and Welcome Section */}
          <div className="text-center mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6 inline-block border-4 border-white/30">
              <img src={'/Media.png'} alt="HyeLife Logo" className="h-24 mx-auto" />
            </div>
            <h1 className="text-white mb-2 text-3xl">Bergabung dengan HyeLife</h1>
            <p className="text-blue-50 text-lg">Mulai perjalanan kesehatan Anda</p>
          </div>

          {/* Register Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">Nomor Telepon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Kata Sandi</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Konfirmasi Kata Sandi</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg h-12 text-base mt-6"
              >
                Daftar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <button 
                  onClick={onNavigateToLogin} 
                  className="text-sky-600 hover:text-sky-700 transition-colors font-semibold"
                >
                  Masuk
                </button>
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
            <p className="text-sm text-white">
              Dengan mendaftar, Anda menyetujui <span className="font-semibold">Syarat & Ketentuan</span> kami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}