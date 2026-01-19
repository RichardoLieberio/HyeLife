import { Home, Calendar, Clock, User } from 'lucide-react';
import type { Page } from '../page.tsx';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { icon: Home, label: 'Beranda', page: 'home' as Page },
    { icon: Calendar, label: 'Appointment', page: 'appointments' as Page },
    { icon: Clock, label: 'Riwayat', page: 'history' as Page },
    { icon: User, label: 'Profil', page: 'profile' as Page },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex items-center justify-around px-6 py-3">
        {navItems.map((item, index) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={index}
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center space-y-1 ${
                isActive ? 'text-sky-600' : 'text-gray-400'
              }`}
            >
              <item.icon className={`h-6 w-6 ${isActive ? 'fill-sky-100' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
