'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LiveChatsTab = () => {
    const liveChats = [
        { id: 1, name: "Maria Rodriguez", lastMessage: "¡Gracias! Todo perfecto.", time: "10:45 AM", unread: 0, avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: "Carlos Gomez", lastMessage: "Hola, ¿puedo cambiar mi pedido?", time: "10:42 AM", unread: 2, avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: "Ana Perez", lastMessage: "Mi dirección es Calle 123.", time: "Ayer", unread: 0, avatar: 'https://i.pravatar.cc/150?img=3' },
    ];
    const [selectedChat, setSelectedChat] = React.useState(liveChats[1]);
    const chatMessages = [
        { sender: 'user', text: 'Hola, ¿puedo cambiar mi pedido?', time: '10:40 AM' },
        { sender: 'agent', text: '¡Claro! ¿Qué te gustaría cambiar?', time: '10:41 AM' },
        { sender: 'user', text: 'Quisiera agregar una empanada de carne.', time: '10:42 AM' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            <Card className="md:col-span-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Chats Activos</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-full">
                        {liveChats.map(chat => (
                            <div key={chat.id} className={cn("flex items-center gap-3 p-3 cursor-pointer border-b", selectedChat.id === chat.id ? 'bg-muted' : 'hover:bg-muted/50')} onClick={() => setSelectedChat(chat)}>
                                <Avatar>
                                    <AvatarImage src={chat.avatar} />
                                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 truncate">
                                    <p className="font-semibold truncate">{chat.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">{chat.time}</p>
                                    {chat.unread > 0 && <span className="flex items-center justify-center text-xs text-white bg-green-500 rounded-full w-5 h-5">{chat.unread}</span>}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card className="md:col-span-3 flex flex-col">
                <CardHeader className="flex-row items-center gap-3">
                     <Avatar>
                        <AvatarImage src={selectedChat.avatar} />
                        <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-bold tracking-tight">{selectedChat.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">En línea</p>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 bg-muted/30 p-4">
                     <ScrollArea className="h-full">
                        <div className="space-y-4">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={cn("flex items-end gap-2 max-w-md", msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto')}>
                                    <div className={cn("rounded-lg p-3 text-sm", msg.sender === 'user' ? "rounded-br-none bg-primary text-primary-foreground" : "rounded-bl-none bg-background")}>
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <form className="flex items-center gap-2 border-t p-4">
                    <Input placeholder={`Responder a ${selectedChat.name}...`} />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </Card>
        </div>
    )
}
