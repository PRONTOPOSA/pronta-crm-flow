
import { DollarSign, Users, Package, ArrowUpRight } from 'lucide-react';

export const monthlyStats = [
  {
    title: "Fatturato Mensile",
    value: 32450,
    icon: <DollarSign />,
    change: { value: 15, type: "increase" as const },
    trend: "positive" as const,
    tooltipInfo: "Fatturato totale del mese corrente"
  },
  {
    title: "Nuovi Clienti",
    value: "24",
    icon: <Users />,
    change: { value: 12, type: "increase" as const },
    trend: "positive" as const,
    tooltipInfo: "Nuovi clienti acquisiti questo mese"
  },
  {
    title: "Progetti Completati",
    value: "16",
    icon: <Package />,
    change: { value: 3, type: "decrease" as const },
    trend: "negative" as const,
    tooltipInfo: "Progetti completati nel mese corrente"
  },
  {
    title: "Preventivi Approvati",
    value: "28",
    icon: <ArrowUpRight />,
    change: { value: 8, type: "increase" as const },
    trend: "positive" as const,
    tooltipInfo: "Preventivi approvati questo mese"
  }
] as const;
