import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, Heart, Shield, Users, Star, Clock } from 'lucide-react';


interface LoginPageProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister, onNavigateToForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Medical Icons Background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <Heart className="absolute top-10 left-20 w-16 h-16 text-white animate-pulse" />
        <Shield className="absolute top-40 right-32 w-20 h-20 text-white" style={{ animationDelay: '0.5s' }} />
        <Users className="absolute bottom-40 left-40 w-12 h-12 text-white animate-pulse" />
      </div>
      
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo and Welcome Section */}
          <div className="text-center mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6 inline-block border-4 border-white/30">
              <img src={'/Media.png'} alt="HyeLife Logo" className="h-24 mx-auto" />
            </div>
            <h1 className="text-white mb-2 text-3xl">Selamat Datang Kembali</h1>
            <p className="text-sky-50 text-lg">Layanan kesehatan Anda menanti</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-sky-500 focus:ring-sky-500"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="text-right">
                <button 
                  type="button" 
                  onClick={onNavigateToForgotPassword} 
                  className="text-sky-600 text-sm hover:text-sky-700 transition-colors font-medium"
                >
                  Lupa kata sandi?
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg h-12 text-base"
              >
                Masuk
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <button 
                  onClick={onNavigateToRegister} 
                  className="text-sky-600 hover:text-sky-700 transition-colors font-semibold"
                >
                  Daftar sekarang
                </button>
              </p>
            </div>
          </div>

          {/* Features Section with Icons */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/50 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-2 shadow-md">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-gray-700 font-medium">Layanan 24/7</p>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/50 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center mb-2 shadow-md">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-gray-700 font-medium">Dokter Terpercaya</p>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/50 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-2 shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-gray-700 font-medium">Aman & Terjamin</p>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-white text-sm">Data Anda Dilindungi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}