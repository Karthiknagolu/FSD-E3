import React from 'react';
import { EventDetails as EventType } from '../types';

interface Props {
  event: EventType;
}

export const EventDetails: React.FC<Props> = ({ event }) => {
  // Split title for the stacked look if it's long, otherwise just display it
  const titleParts = event.name.split(' ');

  return (
    <div className="h-full flex flex-col justify-between" id="event-details-section">
      <div>
        <p className="text-accent font-black uppercase tracking-[0.2em] text-sm mb-4">
          {event.department}
        </p>
        <h1 className="text-7xl lg:text-[100px] leading-[0.9] font-black uppercase tracking-[-0.04em] mb-10">
          {titleParts.map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i < titleParts.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
      </div>
      
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-auto">
        <div className="border-t border-border pt-5">
          <p className="text-[11px] text-text-dim uppercase font-bold tracking-wider mb-2">Date & Time</p>
          <p className="text-xl font-medium tracking-tight whitespace-nowrap">{event.date.toUpperCase()}, {event.time}</p>
        </div>
        <div className="border-t border-border pt-5">
          <p className="text-[11px] text-text-dim uppercase font-bold tracking-wider mb-2">Venue</p>
          <p className="text-xl font-medium tracking-tight whitespace-nowrap">{event.venue}</p>
        </div>
        <div className="border-t border-border pt-5">
          <p className="text-[11px] text-text-dim uppercase font-bold tracking-wider mb-2">Price Per Unit</p>
          <p className="text-xl font-medium tracking-tight">₹{event.ticketPrice.toFixed(2)}</p>
        </div>
        <div className="border-t border-border pt-5">
          <p className="text-[11px] text-text-dim uppercase font-bold tracking-wider mb-2">Available Tickets</p>
          <p className={`text-xl font-black ${event.availableTickets > 0 ? 'text-accent' : 'text-error'}`}>
            {event.availableTickets > 0 ? `${event.availableTickets} LEFT` : 'SOLD OUT'}
          </p>
        </div>
      </div>
    </div>
  );
};
