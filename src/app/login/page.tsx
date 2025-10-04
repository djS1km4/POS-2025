'use client';

import React, { useState, useContext, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserContext } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Lock, Loader2 } from 'lucide-react';


const WavyBackground = () => (
    <>
        <svg
            className="absolute top-0 left-0 w-1/2 h-auto text-white/5 pointer-events-none"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M 0 800 Q 200 600 400 800 T 800 600 V 0 H 0 Z"
                fill="currentColor"
                opacity="0.1"
            />
             <path
                d="M 0 700 Q 150 550 300 700 T 600 550 T 900 700 V 0 H 0 Z"
                fill="currentColor"
                 opacity="0.1"
            />
        </svg>
        <svg
            className="absolute bottom-0 right-0 w-1/2 h-auto text-white/5 pointer-events-none"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M 800 0 Q 600 200 400 0 T 0 200 V 800 H 800 Z"
                fill="currentColor"
                 opacity="0.1"
            />
             <path
                d="M 800 100 Q 650 250 500 100 T 200 250 T -100 100 V 800 H 800 Z"
                fill="currentColor"
                 opacity="0.1"
            />
        </svg>
    </>
);


export default function LoginPage() {
    const [email, setEmail] = useState('admin@commerceflow.com');
    const [password, setPassword] = useState('password123');
    const [isLoading, setIsLoading] = useState(false);
    const userContext = useContext(UserContext);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (userContext?.currentUser) {
            router.push('/dashboard');
        }
    }, [userContext?.currentUser, router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            if (userContext?.handleLogin) {
                const loginSuccess = userContext.handleLogin(email, password);
                if (loginSuccess) {
                    toast({
                        title: '¡Bienvenido de nuevo!',
                        description: 'Has iniciado sesión correctamente.',
                    });
                    router.push('/dashboard');
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error de autenticación',
                        description: 'El correo electrónico o la contraseña son incorrectos.',
                    });
                    setIsLoading(false);
                }
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'El servicio de autenticación no está disponible.',
                });
                setIsLoading(false);
            }
        }, 1000);
    };
    
    if (userContext?.isInitialized === false || (userContext?.isInitialized && userContext?.currentUser)) {
        return <div className="flex h-screen w-full items-center justify-center login-gradient"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>;
    }


    return (
        <div className="flex min-h-screen items-center justify-center login-gradient relative overflow-hidden">
            <WavyBackground />
             <div className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-md bg-slate-900/50 text-xs font-bold text-white">
                N
            </div>
            <main className="w-full max-w-sm rounded-2xl bg-slate-900/40 backdrop-blur-lg shadow-2xl border border-slate-800/80">
                <div className="p-8 text-white">
                    <h2 className="mb-6 text-center text-3xl font-bold">Login</h2>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="User Name"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="bg-slate-800/50 border-slate-700/80 pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                            <Input 
                                id="password" 
                                type="password"
                                placeholder="Password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading} 
                                className="bg-slate-800/50 border-slate-700/80 pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white"
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember-me" className="border-white/50 data-[state=checked]:bg-white/20 data-[state=checked]:text-white focus:ring-offset-0 focus:ring-white/50" />
                                <Label htmlFor="remember-me" className="text-white">Remember Me</Label>
                            </div>
                            <Link href="#" className="font-semibold text-white hover:underline">
                                Forgot me?
                            </Link>
                        </div>

                        <Button className="w-full !mt-8 bg-white/90 text-slate-800 font-bold hover:bg-white" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin"/> : 'Login'}
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
