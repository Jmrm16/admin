import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, HouseIcon, LayoutGrid, ListStartIcon, User2Icon, MessageCircle } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: '/dashboard',
        icon: HouseIcon,
    },
    {
        title: 'Clientes',
        href: '/usuarios',
        icon: User2Icon,
    },

    {
        title: 'Mis formularios',
        href: '/formularios-medicos',
        icon: BookOpen, // O puedes usar otro icono más relacionado con salud
    },

    {
        title: 'Whatsapp',
        href: '/whatsapp',
        icon: MessageCircle, // O puedes usar otro icono más relacionado con salud
    },

{
  title: 'Administradores',
  href: '/usuarios/admins',
  icon: User2Icon, // puedes usar otro como `ShieldIcon` si deseas distinguirlo
},
{
  title: 'Eventos',
  href: '/eventos',
  icon: Folder, // puedes cambiar por otro icono si prefieres
},

    
    
    
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
