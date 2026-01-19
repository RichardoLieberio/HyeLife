'use client';

import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './components/ProfilePage';
import { AppointmentsPage } from './components/AppointmentsPage';
import { HistoryPage } from './components/HistoryPage';
import { BloodBankPage } from './components/BloodBankPage';
import { DoctorPage } from './components/DoctorPage';
import { NursePage } from './components/NursePage';
import { PharmacyPage } from './components/PharmacyPage';
import { PsychologistPage } from './components/PsychologistPage';
import { SpiritualPage } from './components/SpiritualPage';
import { BottomNav } from './components/BottomNav';
import { CustomerServiceButton } from './components/CustomerServiceButton';

export type Page =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'home'
  | 'profile'
  | 'appointments'
  | 'history'
  | 'blood-bank'
  | 'doctor'
  | 'nurse'
  | 'pharmacy'
  | 'psychologist'
  | 'spiritual';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => navigateTo('register')} onNavigateToForgotPassword={() => navigateTo('forgot-password')} />;
      case 'register':
        return <RegisterPage onRegister={handleLogin} onNavigateToLogin={() => navigateTo('login')} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigateToLogin={() => navigateTo('login')} />;
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'profile':
        return <ProfilePage onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'appointments':
        return <AppointmentsPage onNavigate={navigateTo} />;
      case 'history':
        return <HistoryPage onNavigate={navigateTo} />;
      case 'blood-bank':
        return <BloodBankPage onNavigate={navigateTo} />;
      case 'doctor':
        return <DoctorPage onNavigate={navigateTo} />;
      case 'nurse':
        return <NursePage onNavigate={navigateTo} />;
      case 'pharmacy':
        return <PharmacyPage onNavigate={navigateTo} />;
      case 'psychologist':
        return <PsychologistPage onNavigate={navigateTo} />;
      case 'spiritual':
        return <SpiritualPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  const showBottomNav = isLoggedIn && currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'forgot-password';
  const showCustomerService = isLoggedIn && currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'forgot-password';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative bg-white min-h-screen pb-20">
        {renderPage()}
        {showBottomNav && <BottomNav currentPage={currentPage} onNavigate={navigateTo} />}
        {showCustomerService && <CustomerServiceButton />}
      </div>
    </div>
  );
}
