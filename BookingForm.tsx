import React, { useState } from 'react';
import { BookingFormData } from '../types';

interface Props {
  onBook: (data: BookingFormData) => void;
  availableTickets: number;
  ticketPrice: number;
}

export const BookingForm: React.FC<Props> = ({ onBook, availableTickets, ticketPrice }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    department: '',
    numTickets: 1,
    vtuNo: '',
    registerNo: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (formData.numTickets <= 0) newErrors.numTickets = 'Invalid quantity';
    if (formData.numTickets > availableTickets) newErrors.numTickets = 'Exceeds availability';
    if (!formData.vtuNo.trim()) newErrors.vtuNo = 'VTU No is required';
    if (!formData.registerNo.trim()) newErrors.registerNo = 'Register No is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onBook(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numTickets' ? parseInt(value) || 0 : value
    }));
    if (errors[name as keyof BookingFormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const totalAmount = formData.numTickets * ticketPrice;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full" id="booking-form">
      <h2 className="text-2xl font-bold mb-10 text-white">Reserve Tickets</h2>
      
      <div className="space-y-6 flex-1">
        <div className="form-group">
          <label className="block text-[11px] text-text-dim uppercase font-bold mb-2 tracking-wider">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Alex Johnson"
            className={`w-full bg-bg border ${errors.name ? 'border-error' : 'border-border focus:border-accent'} p-4 text-white outline-none transition-colors rounded-sm`}
          />
          {errors.name && <p className="text-error text-[10px] mt-1 font-bold uppercase">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="block text-[11px] text-text-dim uppercase font-bold mb-2 tracking-wider">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="alex@university.edu"
            className={`w-full bg-bg border ${errors.email ? 'border-error' : 'border-border focus:border-accent'} p-4 text-white outline-none transition-colors rounded-sm`}
          />
          {errors.email && <p className="text-error text-[10px] mt-1 font-bold uppercase">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="form-group">
            <label className="block text-[11px] text-text-dim uppercase font-bold mb-2 tracking-wider">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g. CSE"
              className={`w-full bg-bg border ${errors.department ? 'border-error' : 'border-border focus:border-accent'} p-4 text-white outline-none transition-colors rounded-sm`}
            />
            {errors.department && <p className="text-error text-[10px] mt-1 font-bold uppercase">{errors.department}</p>}
          </div>

          <div className="form-group">
            <label className="block text-[11px] text-text-dim uppercase font-bold mb-2 tracking-wider">Quantity</label>
            <input
              type="number"
              name="numTickets"
              value={formData.numTickets}
              onChange={handleChange}
              min="1"
              className={`w-full bg-bg border ${errors.numTickets ? 'border-error' : 'border-border focus:border-accent'} p-4 text-white outline-none transition-colors rounded-sm`}
            />
            {errors.numTickets && <p className="text-error text-[10px] mt-1 font-bold uppercase">{errors.numTickets}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="form-group">
            <label className="block text-[11px] text-text-dim uppercase font-bold mb-2 tracking-wider">VTU No</label>
            <input
              type="text"
              name="vtuNo"
              value={formData.vtuNo}
              onChange={handleChange}
              placeholder="e.g. VTU12345"
              className={`w-full bg-bg border ${errors.vtuNo ? 'border-error' : 'border-border focus:border-accent'} p-4 text-white outline-none transition-colors rounded-sm`}
            />
            {errors.vtuNo && <p className="text-error text-[10px] mt-1 font-bold uppercase">{errors.vtuNo}</p>}
          </div>

          <div className="form-group">
            <label className="block text-[11px] text-text-dim uppercase font-bold mb-2 tracking-wider">Register No</label>
            <input
              type="text"
              name="registerNo"
              value={formData.registerNo}
              onChange={handleChange}
              placeholder="e.g. 23UECS0912"
              className={`w-full bg-bg border ${errors.registerNo ? 'border-error' : 'border-border focus:border-accent'} p-4 text-white outline-none transition-colors rounded-sm`}
            />
            {errors.registerNo && <p className="text-error text-[10px] mt-1 font-bold uppercase">{errors.registerNo}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={availableTickets === 0}
          className="w-full bg-accent hover:opacity-90 active:scale-[0.98] disabled:bg-border disabled:text-text-dim text-bg font-black py-5 uppercase tracking-widest transition-all rounded-sm mt-4"
        >
          {availableTickets === 0 ? 'Sold Out' : 'Confirm Booking'}
        </button>

        <div className="bg-accent/5 border border-accent/20 p-5 rounded-sm flex justify-between items-center mt-6">
          <span className="text-[11px] uppercase font-bold tracking-widest">Booking Summary</span>
          <div className="text-right">
            <span className="block text-[10px] text-text-dim font-bold">TOTAL AMOUNT</span>
            <span className="text-2xl font-black text-accent tracking-tighter">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 text-[11px] text-text-dim text-center uppercase tracking-widest font-bold leading-relaxed">
        All tickets are non-refundable. <br /> Faculty verification required at entry.
      </div>
    </form>
  );
};
