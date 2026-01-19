import { ChevronRight, User, FileText, CreditCard, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { Page } from '../page.tsx';


interface ProfilePageProps {
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

export function ProfilePage({ onLogout, onNavigate }: ProfilePageProps) {
  const menuItems = [
    { icon: User, label: 'Informasi Pribadi', color: 'text-blue-600' },
    { icon: CreditCard, label: 'Metode Pembayaran', color: 'text-purple-600' },
    { icon: Shield, label: 'Privasi & Keamanan', color: 'text-red-600' },
    { icon: HelpCircle, label: 'Bantuan & Dukungan', color: 'text-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 pt-6 pb-16 rounded-b-3xl">
        <img src={'/Media.png'} alt="HyeLife" className="h-12 mb-6" />
        <h1 className="text-white">Profil Saya</h1>
      </div>

      <div className="px-6 -mt-10">
        {/* Profile Card */}
        <Card className="p-6 bg-white shadow-lg mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-sky-100 text-sky-700">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-gray-800">John Doe</h2>
              <p className="text-gray-500">john.doe@email.com</p>
              <p className="text-gray-500 text-sm mt-1">+62 812-3456-7890</p>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2 mb-6">
          {menuItems.map((item, index) => (
            <Card 
              key={index}
              className="p-4 bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Button 
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Keluar
        </Button>
      </div>
    </div>
  );
}