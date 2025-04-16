
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nome: '',
    cognome: ''
  });
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.nome, formData.cognome);
        setEmailSent(true);
      }
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div>
          <h2 className="text-center text-3xl font-bold">
            {isLogin ? 'Accedi' : 'Registrati'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Non hai un account? " : "Hai già un account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setEmailSent(false);
              }}
              className="font-medium text-primary hover:text-primary/90"
            >
              {isLogin ? 'Registrati' : 'Accedi'}
            </button>
          </p>
        </div>

        {emailSent && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Email di conferma inviata</AlertTitle>
            <AlertDescription>
              Abbiamo inviato un'email di conferma all'indirizzo {formData.email}. 
              Per favore, controlla la tua casella di posta e clicca sul link di conferma per attivare il tuo account.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && !emailSent && (
            <>
              <div>
                <Input
                  type="text"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Cognome"
                  value={formData.cognome}
                  onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                  required
                />
              </div>
            </>
          )}
          
          {!emailSent && (
            <>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {isLogin ? 'Accedi' : 'Registrati'}
              </Button>
            </>
          )}
          
          {emailSent && (
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setEmailSent(false);
                setFormData({
                  email: '',
                  password: '',
                  nome: '',
                  cognome: ''
                });
              }}
            >
              Registra un altro account
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Auth;
