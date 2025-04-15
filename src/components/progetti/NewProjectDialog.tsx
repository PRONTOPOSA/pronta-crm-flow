
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { PreventivoItem } from '@/types/progetti';

interface NewProjectDialogProps {
  onAddProject?: (project: PreventivoItem) => void;
}

export const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ onAddProject }) => {
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<PreventivoItem>>({
    id: crypto.randomUUID(),
    cliente: '',
    descrizione: '',
    valore: '',
    data: new Date().toLocaleDateString('it-IT'),
    scadenza: '',
    tipo: 'preventivo'
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = () => {
    // Validazione dei campi obbligatori
    if (!newProject.cliente?.trim()) {
      toast({
        title: "Campo obbligatorio mancante",
        description: "Il nome del cliente è obbligatorio.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newProject.descrizione?.trim()) {
      toast({
        title: "Campo obbligatorio mancante",
        description: "La descrizione del progetto è obbligatoria.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newProject.valore?.trim()) {
      toast({
        title: "Campo obbligatorio mancante",
        description: "Il valore del progetto è obbligatorio.",
        variant: "destructive"
      });
      return;
    }

    if (!newProject.scadenza?.trim()) {
      toast({
        title: "Campo obbligatorio mancante",
        description: "La data di scadenza è obbligatoria.",
        variant: "destructive"
      });
      return;
    }
    
    // Se la validazione passa, aggiungiamo il progetto
    toast({
      title: "Progetto aggiunto",
      description: `${newProject.descrizione} è stato aggiunto con successo.`,
    });
    
    if (onAddProject) {
      onAddProject(newProject as PreventivoItem);
    }
    
    // Reset del form
    setNewProject({
      id: crypto.randomUUID(),
      cliente: '',
      descrizione: '',
      valore: '',
      data: new Date().toLocaleDateString('it-IT'),
      scadenza: '',
      tipo: 'preventivo'
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Progetto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Nuovo Progetto</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli del nuovo progetto. Clicca su Aggiungi quando hai finito.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                name="cliente"
                value={newProject.cliente}
                onChange={handleInputChange}
                placeholder="Nome del cliente"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="descrizione">Descrizione</Label>
            <Textarea
              id="descrizione"
              name="descrizione"
              value={newProject.descrizione}
              onChange={handleInputChange}
              placeholder="Descrizione del progetto"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valore">Valore (€)</Label>
              <Input
                id="valore"
                name="valore"
                value={newProject.valore}
                onChange={handleInputChange}
                placeholder="es. 1.500 €"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scadenza">Data Scadenza</Label>
              <Input
                id="scadenza"
                name="scadenza"
                type="date"
                value={newProject.scadenza}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annulla</Button>
          </DialogClose>
          <Button onClick={handleAddProject}>Aggiungi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
