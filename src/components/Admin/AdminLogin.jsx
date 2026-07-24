import React, { useState } from 'react';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, Database, AlertCircle } from 'lucide-react';
import { loginAdmin, isSupabaseConfigured } from '../../lib/supabaseClient';

export default function AdminLogin({ onLoginSuccess, onCloseAdmin }) {
  const [email, setEmail] = useState('admin@cafe.com');
  const [password, setPassword] = useState('AdminPassword123!');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const { user, error } = await loginAdmin(email, password);
      if (error) {
        setErrorMsg(error);
      } else if (user) {
        onLoginSuccess(user);
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3d0006] text-white flex items-center justify-center p-4 relative overflow-hidden pt-20">
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fed65b]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5d1016] rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#5d1016]/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-[#fed65b]/30">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#fed65b] text-[#3d0006] flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg border-2 border-white">
            <Lock className="w-8 h-8" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-montserrat font-bold tracking-widest text-[#ffe088] uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#fed65b]" /> RESTRICTED ACCESS
          </span>
          <h2 className="font-montserrat font-black text-3xl text-white">ADMIN LOGIN</h2>
          <p className="font-hanken text-xs text-[#ffb3b1] mt-1">
            TRUCK Coffee to Go Management Portal
          </p>

          {/* Database Connection Badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full text-[11px] font-hanken text-white/80 border border-white/10">
            <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-green-400' : 'text-amber-400'}`} />
            <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Local Sandbox Mode'}</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-montserrat font-bold text-xs text-[#ffe088] mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-[#ffb3b1]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cafe.com"
                className="w-full pl-11 pr-4 py-3 bg-[#3d0006]/80 rounded-2xl border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fed65b]"
              />
            </div>
          </div>

          <div>
            <label className="block font-montserrat font-bold text-xs text-[#ffe088] mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 absolute left-3.5 top-3.5 text-[#ffb3b1]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#3d0006]/80 rounded-2xl border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fed65b]"
              />
            </div>
          </div>

          {/* Preset Test Credentials Tip */}
          <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-[11px] text-[#ffb3b1]">
            <span className="font-bold text-[#fed65b]">Default Admin Login:</span><br />
            Email: <code className="text-white bg-black/30 px-1 rounded">admin@cafe.com</code><br />
            Pass: <code className="text-white bg-black/30 px-1 rounded">AdminPassword123!</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#fed65b] text-[#3d0006] font-montserrat font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-[#3d0006] border-t-transparent animate-spin"></div>
            ) : (
              <>
                SIGN IN TO DASHBOARD
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onCloseAdmin}
            className="font-montserrat font-bold text-xs text-[#ffb3b1] hover:text-white transition-colors"
          >
            ← Return to Storefront
          </button>
        </div>

      </div>
    </div>
  );
}
