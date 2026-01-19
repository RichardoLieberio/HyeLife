import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function CustomerServiceButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 h-14 w-14 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Dialog */}
      {isOpen && (
        <Card className="fixed bottom-40 right-6 w-80 shadow-2xl z-50 overflow-hidden">
          <div className="bg-sky-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3>Customer Service</h3>
                <p className="text-sky-100 text-sm">Online • Siap membantu Anda</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-sky-100"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 h-64 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-gray-800 text-sm">
                  Halo! Selamat datang di HyeLife 👋
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  Ada yang bisa kami bantu?
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="justify-start text-left h-auto py-2"
                >
                  🏥 Cara memesan layanan
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="justify-start text-left h-auto py-2"
                >
                  💳 Metode pembayaran
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="justify-start text-left h-auto py-2"
                >
                  📞 Hubungi kami
                </Button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ketik pesan..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                Kirim
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
