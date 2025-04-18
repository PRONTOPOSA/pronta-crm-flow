import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VenditoreFormData } from '@/types/venditori';
import { toast } from '@/components/ui/use-toast';

interface VenditoreFormProps {
  onSubmit: (data: VenditoreFormData) => void;
  onCancel: () => void;
}

export const VenditoreForm = ({ onSubmit, onCancel }: VenditoreFormProps) => {
  const [formData, setFormData] = useState<VenditoreFormData>({
    nome: '',
    cognome: '',
    email: '',
    password: ''
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome è richiesto";
    if (!formData.cognome.trim()) newErrors.cognome = "Cognome è richiesto";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email è richiesta";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email non valida";
    }
    
    if (!formData.password) {
      newErrors.password = "Password è richiesta";
    } else if (formData.password.length < 6) {
      newErrors.password = "La password deve avere almeno 6 caratteri";
    }
    
    if (formData.password !== passwordConfirm) {
      newErrors.passwordConfirm = "Le password non corrispondono";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome</Label>
          <Input 
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cognome">Cognome</Label>
          <Input 
            id="cognome"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
          />
          {errors.cognome && <p className="text-red-500 text-sm">{errors.cognome}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">Conferma Password</Label>
        <Input 
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>}
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annulla
        </Button>
        <Button type="submit">
          Salva
        </Button>
      </div>
    </form>
  );
};
