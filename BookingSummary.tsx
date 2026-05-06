import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Booking, EventDetails } from '../types';

interface Props {
  booking: Booking | null;
  event: EventDetails;
  onReset: () => void;
}

export const BookingSummary: React.FC<Props> = ({ booking, event, onReset }) => {
  if (!booking) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-white text-black p-10 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      id="booking-summary"
    >
      <div className="border-b-4 border-black pb-4 mb-8">
        <h2 className="text-sm font-black uppercase tracking-widest">Confirmation Details</h2>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-tighter">Attendee</span>
          <span className="text-xl font-bold uppercase">{booking.userName}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-tighter">Event</span>
          <span className="text-xl font-bold uppercase">{event.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-tighter">Quantity</span>
            <span className="text-xl font-bold uppercase">{booking.ticketsBooked} Tickets</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-tighter">Booking ID</span>
            <span className="text-xl font-bold uppercase font-mono tracking-tighter">#{booking.id.toUpperCase()}</span>
          </div>
        </div>

        <div className="pt-8 mt-4 border-t border-slate-100 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-tighter">Total Price</span>
            <span className="text-4xl font-black tracking-tighter">₹{booking.totalAmount.toFixed(2)}</span>
          </div>
          
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-[10px] font-black uppercase bg-black text-white px-4 py-3 hover:bg-slate-800 transition-colors rounded-sm"
          >
            <ArrowLeft className="w-3 h-3" />
            New Booking
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-[9px] text-slate-400 font-bold uppercase text-center tracking-widest leading-relaxed">
        This is an official registration confirmation. <br /> Present this ID at the venue gate for entry.
      </div>
    </motion.div>
  );
};
