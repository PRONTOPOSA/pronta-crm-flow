
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Facebook, Instagram, Users, Megaphone, Gift } from 'lucide-react';

interface SourceSectionProps {
  fonte: string;
  onSourceChange: (value: string) => void;
}

export const SourceSection = ({ fonte, onSourceChange }: SourceSectionProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="fonte">Fonte</Label>
      <Select onValueChange={onSourceChange} value={fonte}>
        <SelectTrigger>
          <SelectValue placeholder="Seleziona la fonte" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="facebook">
            <div className="flex items-center">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </div>
          </SelectItem>
          <SelectItem value="instagram">
            <div className="flex items-center">
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </div>
          </SelectItem>
          <SelectItem value="referral">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Referral
            </div>
          </SelectItem>
          <SelectItem value="campagna">
            <div className="flex items-center">
              <Megaphone className="mr-2 h-4 w-4" />
              Campagna Marketing
            </div>
          </SelectItem>
          <SelectItem value="promo">
            <div className="flex items-center">
              <Gift className="mr-2 h-4 w-4" />
              Promozione
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
