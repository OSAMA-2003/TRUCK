import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import truckLogo from '../assets/truck-logo.png';

export default function Header({ onOpenOrderModal, cartCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-50'
        } ${isAtTop
          ? 'top-0 pt-4 px-4 md:px-12'
          : 'top-3 px-4 md:px-12'
        }`}
    >
      <div
        className={`h-20 transition-all duration-300 flex items-center justify-between px-6 md:px-8 max-w-7xl mx-auto ${isAtTop
          ? 'bg-transparent border-transparent rounded-none shadow-none text-white'
          : 'bg-[#3d0006]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(61,0,6,0.12)] rounded-full border border-[#dbc0bf]/30 text-[#3d0006]'
          }`}
      >
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={truckLogo}
            alt="TRUCK Logo"
            className="w-30  object-contain "
          />

        </Link>


        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Order Now Button */}
          <button
            onClick={onOpenOrderModal}
            className={`relative font-montserrat font-bold text-xs tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-md flex items-center gap- bg-[#fed65b] text-[#3d0006] hover:bg-white shadow-[#fed65b]/20'`}
          >
            <ShoppingBag className={`w-4 h-4 text-[#3d0006] `} />
            <span className="hidden xs:inline">ORDER NOW</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#fed65b] text-[#3d0006] w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors text-white hover:bg-white/10'
              }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-[#fcf9f8]/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-[#dbc0bf]/40 max-w-7xl mx-auto flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-montserrat font-bold text-sm text-[#3d0006] py-2 border-b border-[#f0eded]"
          >
            HOME
          </Link>
          <Link
            to="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="font-montserrat font-bold text-sm text-[#3d0006] py-2 border-b border-[#f0eded]"
          >
            OUR MENU
          </Link>
        </div>
      )}
    </header>
  );
}
