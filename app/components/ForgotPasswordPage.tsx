import { useState } from 'react';
import { ArrowLeft, Mail, Lock, CheckCircle, Shield, Key, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';


interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void;
}

export function ForgotPasswordPage({ onNavigateToLogin }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'password' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending OTP
    alert(`Kode OTP telah dikirim ke ${email}`);
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setStep('password');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setStep('success');
      setTimeout(() => {
        onNavigateToLogin();
      }, 2000);
    } else {
      alert('Password tidak cocok!');
    }
  };

  const handleBack = () => {
    if (step === 'otp') setStep('email');
    else if (step === 'password') setStep('otp');
    else onNavigateToLogin();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Decorative Icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <Key className="absolute top-16 right-32 w-16 h-16 text-white animate-pulse" />
        <Shield className="absolute bottom-24 left-24 w-20 h-20 text-white" />
        <Lock className="absolute top-1/3 left-1/3 w-12 h-12 text-white animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          {step !== 'success' && (
            <div className="text-center mb-8">
              <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6 inline-block border-4 border-white/30">
                <img src={'/Media.png'} alt="HyeLife Logo" className="h-24 mx-auto" />
              </div>
              {step === 'email' && (
                <>
                  <h1 className="text-white mb-2 text-3xl">Lupa Kata Sandi</h1>
                  <p className="text-sky-50 text-lg">Kami akan membantu Anda mengatur ulang</p>
                </>
              )}
            </div>
          )}
        
        {/* Step: Email */}
        {step === 'email' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            <form onSubmit={handleEmailSubmit} className="space-y-5">
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

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg h-12"
              >
                Kirim Kode OTP
              </Button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={onNavigateToLogin} 
                  className="text-sky-600 text-sm hover:text-sky-700 transition-colors font-medium inline-flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Kembali ke Login
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step: OTP */}
        {step === 'otp' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-sky-100 to-sky-100 flex items-center justify-center">
                <Key className="h-10 w-10 text-sky-600" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-gray-800 mb-2 text-xl">Masukkan Kode OTP</h2>
              <p className="text-gray-600 text-sm">Kode telah dikirim ke {email}</p>
            </div>
            
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-center text-gray-700 text-sm">
                  Tidak menerima kode? <span className="text-sky-600 cursor-pointer hover:text-sky-700 font-semibold">Kirim ulang</span>
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg h-12"
                disabled={otp.length !== 6}
              >
                Verifikasi
              </Button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={handleBack} 
                  className="text-gray-600 text-sm hover:text-gray-700 transition-colors inline-flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step: New Password */}
        {step === 'password' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-sky-100 to-sky-100 flex items-center justify-center">
                <Lock className="h-10 w-10 text-sky-600" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-gray-800 mb-2 text-xl">Buat Kata Sandi Baru</h2>
              <p className="text-gray-600 text-sm">Pilih kata sandi yang kuat dan aman</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-700">Kata Sandi Baru</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-sky-500 focus:ring-sky-500"
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 bg-gray-50 border-gray-200 h-12 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                <p className="text-sm text-sky-800">
                  <span className="font-semibold">🔐 Tips Keamanan:</span> Gunakan minimal 8 karakter dengan kombinasi huruf dan angka
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg h-12"
              >
                Ubah Kata Sandi
              </Button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={onNavigateToLogin} 
                  className="text-gray-600 text-sm hover:text-gray-700 transition-colors inline-flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Kembali ke Login
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="text-center mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6 inline-block border-4 border-white/30">
              <img src={'/Media.png'} alt="HyeLife Logo" className="h-24 mx-auto" />
            </div>
          </div>
        )}
        {step === 'success' && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-sky-100 to-sky-100 flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-12 w-12 text-sky-600" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-gray-800 text-2xl">Berhasil! 🎉</h2>
                <p className="text-gray-600">
                  Kata sandi Anda telah berhasil diubah
                </p>
              </div>

              <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                <p className="text-sm text-sky-800">
                  Anda akan diarahkan ke halaman login dalam beberapa saat...
                </p>
              </div>

              <Button 
                onClick={onNavigateToLogin}
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg h-12"
              >
                Kembali ke Login
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}