'use client';
import React, { useContext } from 'react';
import { Send, Bot, User, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChatBubble } from '@/components/ui/chat-bubble';
import { getWhatsAppResponse } from './actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BusinessContext } from '@/context/business-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { UserContext } from '@/context/user-context';
import { AiTrainingTab } from './components/ai-training-tab';
import { LiveChatsTab } from './components/live-chats-tab';


type Message = {
    sender: 'user' | 'agent';
    text: string;
};

type FlowMessage = {
    role: 'user' | 'model';
    content: string;
}

const AiAgentTab = () => {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const context = useContext(BusinessContext);

    if (!context) {
        throw new Error("BusinessContext must be used within a BusinessProvider");
    }
    const { businessInfo } = context;

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        const conversationHistory: FlowMessage[] = updatedMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            content: msg.text,
        }));

        const response = await getWhatsAppResponse(input, businessInfo.name, conversationHistory);
        setIsLoading(false);

        if (response.message === 'success' && response.data) {
            const agentMessage: Message = { sender: 'agent', text: response.data.response };
            setMessages(prev => [...prev, agentMessage]);
        } else {
            const errorMessage: Message = { sender: 'agent', text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde." };
            setMessages(prev => [...prev, errorMessage]);
        }
    };
    
    React.useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    return (
        <Card className="flex-1 flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback className="bg-green-500 text-white"><Bot /></AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-bold tracking-tight">Simulador de Agente IA</CardTitle>
                        <p className="text-sm text-muted-foreground">Prueba y entrena el flujo de conversación del bot.</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden p-0">
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <ChatBubble key={index} sender={msg.sender} message={msg.text} />
                        ))}
                        {isLoading && <ChatBubble sender="agent" isLoading />}
                    </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t p-4">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu pedido aquí..."
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default function WhatsAppPage() {
    const userContext = useContext(UserContext);
    const isAdmin = userContext?.currentUser?.role === 'Administrador';

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
            <Tabs defaultValue="simulation" className="flex-1 flex flex-col">
                <TabsList className={cn("w-full grid", isAdmin ? "grid-cols-3" : "grid-cols-2")}>
                    <TabsTrigger value="simulation">
                        <Bot className="mr-2" /> Agente de Pruebas
                    </TabsTrigger>
                    <TabsTrigger value="live">
                        <User className="mr-2" /> Chats en Vivo
                    </TabsTrigger>
                    {isAdmin && (
                        <TabsTrigger value="training">
                            <BrainCircuit className="mr-2" /> Entrenamiento de IA
                        </TabsTrigger>
                    )}
                </TabsList>
                <TabsContent value="simulation" className="flex-1 mt-4">
                    <AiAgentTab />
                </TabsContent>
                <TabsContent value="live" className="flex-1 mt-4">
                    <LiveChatsTab />
                </TabsContent>
                 {isAdmin && (
                    <TabsContent value="training" className="flex-1 mt-4">
                        <AiTrainingTab />
                    </TabsContent>
                 )}
            </Tabs>
        </div>
    );
}
