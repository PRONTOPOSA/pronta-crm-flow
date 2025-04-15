
import { DollarSign, Users, Package, ArrowUpRight } from 'lucide-react';
import React from 'react';

export const monthlyStats = [
  {
    title: "Fatturato Mensile",
    value: 32450,
    icon: React.createElement(DollarSign),
    change: { value: 15, type: "increase" as const },
    trend: "positive" as const,
    tooltipInfo: "Fatturato totale del mese corrente"
  },
  {
    title: "Nuovi Clienti",
    value: "24",
    icon: React.createElement(Users),
    change: { value: 12, type: "increase" as const },
    trend: "positive" as const,
    tooltipInfo: "Nuovi clienti acquisiti questo mese"
  },
  {
    title: "Progetti Completati",
    value: "16",
    icon: React.createElement(Package),
    change: { value: 3, type: "decrease" as const },
    trend: "negative" as const,
    tooltipInfo: "Progetti completati nel mese corrente"
  },
  {
    title: "Preventivi Approvati",
    value: "28",
    icon: React.createElement(ArrowUpRight),
    change: { value: 8, type: "increase" as const },
    trend: "positive" as const,
    tooltipInfo: "Preventivi approvati questo mese"
  }
] as const;
