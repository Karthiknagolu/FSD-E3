export interface EventDetails {
  id: string;
  name: string;
  department: string;
  date: string;
  time: string;
  venue: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
}

export interface Booking {
  id: string;
  userName: string;
  email: string;
  department: string;
  ticketsBooked: number;
  totalAmount: number;
  timestamp: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  department: string;
  numTickets: number;
  vtuNo: string;
  registerNo: string;
}
