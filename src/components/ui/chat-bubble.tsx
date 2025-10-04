"use client";

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { Skeleton } from "./skeleton";

interface ChatBubbleProps {
  sender: 'user' | 'agent';
  message?: string;
  isLoading?: boolean;
}

export function ChatBubble({ sender, message, isLoading = false }: ChatBubbleProps) {
  const isUser = sender === 'user';

  return (
    <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-5 w-5" />
        </div>
      )}
      <div
        className={cn(
          "max-w-xs rounded-lg p-3 text-sm lg:max-w-md",
          isUser
            ? "rounded-br-none bg-primary text-primary-foreground"
            : "rounded-bl-none bg-muted"
        )}
      >
        {isLoading ? (
            <div className="flex items-center gap-2">
                <Skeleton className="w-2 h-2 rounded-full animate-bounce delay-0" />
                <Skeleton className="w-2 h-2 rounded-full animate-bounce delay-150" />
                <Skeleton className="w-2 h-2 rounded-full animate-bounce delay-300" />
            </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
