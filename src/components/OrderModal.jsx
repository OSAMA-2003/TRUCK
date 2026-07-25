import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, PhoneCall, Send } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [customerName, setCustomerName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let text = `*New Order from TRUCK Coffee to Go*\n\n`;
    if (customerName) text += `*Customer:* ${customerName}\n`;
    text += `*Order Items:*\n`;

    cartItems.forEach(item => {
      text += `• ${item.name} (${item.quantity}x) - ${(Number(item.price) * item.quantity).toFixed(2)} EGP\n`;
    });

    text += `\n*Total:* ${total.toFixed(2)} EGP`;
    if (orderNotes) text += `\n*Notes:* ${orderNotes}`;
    text += `\n*Delivery/Pickup Location:* شارع القاعات امام الشيخ رجب`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/201029317818?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#fcf9f8] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#dbc0bf] flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-[#3d0006] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fed65b] text-[#3d0006] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-montserrat font-black text-xl text-[#ffe088]">YOUR ORDER</h3>
              <p className="font-hanken text-xs text-[#ffb3b1]">TRUCK Coffee to Go</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-[#554241]">
              <ShoppingBag className="w-16 h-16 mx-auto text-[#dbc0bf] mb-3 opacity-60" />
              <p className="font-montserrat font-bold text-lg text-[#3d0006]">Your cart is empty</p>
              <p className="font-hanken text-sm text-[#887271]">Add your favorite drinks from the menu to start!</p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-[#f6f3f2] rounded-2xl border border-[#e5e2e1]"
                  >
                    <div className="flex items-center gap-3">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#dbc0bf]"
                        />
                      )}
                      <div>
                        <h4 className="font-montserrat font-bold text-sm text-[#3d0006]">{item.name}</h4>
                        <span className="font-playfair font-bold text-xs text-[#735c00]">
                          {Number(item.price).toFixed(2)} EGP
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#dbc0bf] rounded-full bg-white px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-[#3d0006] hover:text-[#735c00]"
                        >
                          -
                        </button>
                        <span className="px-2 font-montserrat font-bold text-xs">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-[#3d0006] hover:text-[#735c00]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Form Inputs */}
              <div className="space-y-3 pt-4 border-t border-[#dbc0bf]/40">
                <div>
                  <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                  />
                </div>

                <div>
                  <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">
                    Special Requests / Notes
                  </label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Sugar level, extra ice, milk preference..."
                    rows="2"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                  ></textarea>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="bg-[#f0eded] p-6 border-t border-[#dbc0bf] space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-montserrat font-bold text-sm text-[#887271]">TOTAL:</span>
              <span className="font-playfair font-black text-2xl text-[#3d0006]">
                {total.toFixed(2)} EGP
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsAppOrder}
                className="py-3 bg.green-600 bg-emerald-600 hover:bg-emerald-700 text-white font-montserrat font-bold text-xs tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> ORDER WHATSAPP
              </button>
              <a
                href="tel:01035363026"
                className="py-3 bg-[#3d0006] hover:bg-[#735c00] text-white font-montserrat font-bold text-xs tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#fed65b]" /> CALL TO ORDER
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
