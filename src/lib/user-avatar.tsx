import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "./utils";
import { Smile, Star, Heart } from "lucide-react";
import type { User } from "./placeholder-data";

export const defaultAvatars = [
    { id: 'smile-icon', icon: <Smile className="w-10 h-10" /> },
    { id: 'star-icon', icon: <Star className="w-10 h-10" /> },
    { id: 'heart-icon', icon: <Heart className="w-10 h-10" /> },
];

export const renderAvatar = (user: User, large: boolean = false) => {
    const sizeClass = large ? "h-20 w-20" : "h-10 w-10";
    const currentAvatarUrl = user.avatarUrl;
    const currentZoom = user.avatarZoom || 1;

    if (currentAvatarUrl.startsWith('default:')) {
        const avatarId = currentAvatarUrl.split(':')[1];
        const avatar = defaultAvatars.find(a => a.id === avatarId);
        return avatar ? (
            <Avatar className={sizeClass}>
                <AvatarFallback className="bg-muted text-muted-foreground">
                    {React.cloneElement(avatar.icon, {className: large ? "w-10 h-10" : "w-5 h-5"})}
                </AvatarFallback>
            </Avatar>
        ) : <AvatarImage src={undefined} alt={user.name} />;
    }
    return (
        <Avatar className={cn(sizeClass, "overflow-hidden")}>
            <AvatarImage 
                src={currentAvatarUrl} 
                alt={user.name} 
                style={{ transform: `scale(${currentZoom})`, objectFit: 'cover', width: '100%', height: '100%' }}
            />
             <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
    );
};
