import { AlertCircle, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return <div className="min-h-screen flex items-center justify-center bg-[#f4f6f0] p-6"><div className="max-w-md w-full border border-[#dfe5db] bg-white rounded-xl p-8 text-center shadow-[0_18px_55px_rgba(23,36,24,.08)]"><AlertCircle className="mx-auto mb-5 text-[#84a461]" size={42} /><span className="eyebrow">PAGE NOT FOUND</span><h1 className="text-5xl font-bold tracking-[-.08em] mt-3 mb-3">404</h1><p className="text-[#718074] text-sm leading-6 mb-7">This page may have moved or does not exist yet. Return to your dashboard and continue learning.</p><button className="button button-primary mx-auto" onClick={() => setLocation("/")}><ArrowLeft size={15} /> Back to overview</button></div></div>;
}
