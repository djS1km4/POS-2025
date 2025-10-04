'use client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Palette, Users, HardHat, Package, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const settingsCategories = [
    {
        href: '/dashboard/settings/general',
        title: 'General',
        description: 'Configura los datos de tu negocio, logo y la información regional.',
        icon: Briefcase,
    },
    {
        href: '/dashboard/settings/users',
        title: 'Usuarios',
        description: 'Gestiona los usuarios y sus roles en el sistema.',
        icon: Users,
    },
    {
        href: '/dashboard/settings/appearance',
        title: 'Apariencia',
        description: 'Personaliza el tema, los colores y el idioma de la aplicación.',
        icon: Palette,
    },
     {
        href: '/dashboard/settings/hardware',
        title: 'Hardware',
        description: 'Conecta y configura impresoras y cajas registradoras.',
        icon: HardHat,
    },
    {
        href: '/dashboard/integrations',
        title: 'Integraciones',
        description: 'Sincroniza con plataformas de delivery y otros servicios.',
        icon: Package,
    },
    {
        href: '/dashboard/settings/payment-methods',
        title: 'Métodos de Pago',
        description: 'Activa o desactiva los métodos de pago disponibles.',
        icon: CreditCard,
    }
];


export default function SettingsPage() {
    const pathname = usePathname();
    const isRootSettings = pathname === '/dashboard/settings';

    if (!isRootSettings) return null;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
                <p className="text-muted-foreground">Administra la configuración de tu negocio y la aplicación.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {settingsCategories.map((category) => (
                    <Link href={category.href} key={category.title}>
                        <Card className="h-full hover:bg-muted/50 transition-colors group">
                            <CardHeader>
                                 <div className='flex items-center gap-4'>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <category.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold">{category.title}</CardTitle>
                                        <CardDescription className="text-xs">{category.description}</CardDescription>
                                    </div>
                                 </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
