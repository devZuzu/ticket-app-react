import { useState, useEffect } from 'react';

function useTickets() {
  const [tickets, setTickets] = useState(() => {
    
    const savedTickets = localStorage.getItem('tickets');
    return savedTickets ? JSON.parse(savedTickets) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  
  const updateTickets = (newTickets) => {
    setTickets(newTickets);
  };

  return [tickets, updateTickets];
}

export default useTickets;