'use client';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootSettings = pathname === '/dashboard/settings';

  return (
    <div className="flex flex-col gap-8 w-full">
        {!isRootSettings && (
            <div className="mb-4">
                <Button variant="ghost" asChild className="justify-start">
                     <Link href="/dashboard/settings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a Configuración
                    </Link>
                </Button>
            </div>
        )}
        <main className="w-full">
            {children}
        </main>
    </div>
  );
}
