import React from 'react';
import { motion } from 'motion/react';
import { Ticket, X, Printer, Download, Calendar, MapPin, User, CheckCircle } from 'lucide-react';

interface Props {
  booking: any;
  onClose: () => void;
}

export function Receipt({ booking, onClose }: Props) {
  const handlePrint = () => {
    window.print();
  };

  const bookingId = `TKT-${booking.id.toString().padStart(4, '0')}`;
  // Use a public QR code API for the mock
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-bg/90 backdrop-blur-md overflow-y-auto">
      {/* Print-only stylesheet */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .receipt-content, .receipt-content * { visibility: visible; }
          .receipt-content { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            background: white !important; 
            color: black !important;
            padding: 40px !important;
          }
          .no-print { display: none !important; }
          .receipt-card { border: 2px solid #eee !important; box-shadow: none !important; }
          .text-accent { color: #000 !important; }
          .bg-accent { background: #000 !important; color: white !important; }
        }
      `}</style>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl bg-surface border border-border shadow-2xl relative receipt-content"
      >
        {/* Header Actions (No Print) */}
        <div className="flex justify-between items-center p-6 border-b border-border no-print">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-accent" />
            <span className="font-black uppercase tracking-widest text-xs">Digital Ticket</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrint}
              className="p-2 hover:bg-white/5 text-text-dim hover:text-accent transition-colors"
              title="Print"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 text-text-dim hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">Booking Confirmed</h2>
            <p className="text-text-dim text-sm uppercase tracking-widest font-bold">Transaction Successful</p>
          </div>

          {/* Ticket Card */}
          <div className="border-2 border-dashed border-border rounded-xl overflow-hidden receipt-card">
            <div className="bg-accent/5 p-8 border-b-2 border-dashed border-border">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">Event</span>
                  <h3 className="text-xl font-black uppercase tracking-tight">{booking.event_name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">Ticket ID</span>
                  <span className="text-sm font-mono font-bold text-accent">{bookingId}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">Attendee</span>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <User className="w-3 h-3 text-accent" />
                    {booking.user_name || 'Attendee'}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">Quantity</span>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Ticket className="w-3 h-3 text-accent" />
                    {booking.tickets_booked} Tickets
                  </div>
                </div>
                {booking.vtu_no && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">VTU No</span>
                    <div className="text-sm font-bold">{booking.vtu_no}</div>
                  </div>
                )}
                {booking.register_no && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">Register No</span>
                    <div className="text-sm font-bold">{booking.register_no}</div>
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">Date & Time</span>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Calendar className="w-3 h-3 text-accent" />
                    {booking.event_date}
                  </div>
                  <div className="text-[10px] font-medium text-text-dim mt-0.5">{booking.event_time}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">Venue</span>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <MapPin className="w-3 h-3 text-accent" />
                    {booking.event_venue}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section with QR */}
            <div className="p-8 flex items-center justify-between bg-surface/50">
              <div className="flex-1 pr-6">
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim block mb-1">Total Amount Paid</span>
                  <span className="text-3xl font-black text-white">₹{booking.total_amount}</span>
                </div>
                <p className="text-[9px] text-text-dim uppercase leading-relaxed font-medium">
                  This is a digital ticket. Please present the QR code at the entrance for verification. 
                  Valid government ID may be required.
                </p>
              </div>
              <div className="w-24 h-24 bg-white p-2 rounded-lg shrink-0">
                <img src={qrUrl} alt="Ticket QR" className="w-full h-full" />
              </div>
            </div>
          </div>

          <div className="mt-10 text-center no-print">
            <button 
              onClick={onClose}
              className="text-[11px] font-black uppercase tracking-widest text-text-dim hover:text-white transition-colors"
            >
              Close Receipt
            </button>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-1 bg-accent w-full" />
      </motion.div>
    </div>
  );
}
