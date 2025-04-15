
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    nome: '',
    cognome: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;
      
      toast({
        title: "Login completato",
        description: "Sei stato autenticato con successo",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Errore durante il login",
        description: error.message || "Si è verificato un errore durante il login",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!signupData.nome || !signupData.cognome) {
      toast({
        title: "Dati mancanti",
        description: "Nome e cognome sono campi obbligatori",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            nome: signupData.nome,
            cognome: signupData.cognome,
            ruolo: 'operatore' // Ruolo predefinito
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "Registrazione completata",
        description: "L'account è stato creato con successo. Controlla la tua email per confermare la registrazione.",
      });
    } catch (error: any) {
      toast({
        title: "Errore durante la registrazione",
        description: error.message || "Si è verificato un errore durante la registrazione",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">ProntoPosa CRM</h1>
          <p className="text-gray-600 mt-2">Gestione clienti e progetti</p>
        </div>
        
        <Card>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Accedi</TabsTrigger>
              <TabsTrigger value="register">Registrati</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Accedi</CardTitle>
                  <CardDescription>Inserisci le tue credenziali per accedere al sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="nome@azienda.it" 
                      required 
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      required 
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Caricamento..." : "Accedi"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleSignup}>
                <CardHeader>
                  <CardTitle>Registrati</CardTitle>
                  <CardDescription>Crea un nuovo account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input 
                        id="nome" 
                        name="nome" 
                        required 
                        value={signupData.nome}
                        onChange={handleSignupChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cognome">Cognome</Label>
                      <Input 
                        id="cognome" 
                        name="cognome" 
                        required 
                        value={signupData.cognome}
                        onChange={handleSignupChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      name="email" 
                      type="email" 
                      placeholder="nome@azienda.it" 
                      required 
                      value={signupData.email}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      name="password" 
                      type="password" 
                      required 
                      value={signupData.password}
                      onChange={handleSignupChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Caricamento..." : "Registrati"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
