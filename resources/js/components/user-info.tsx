import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: User | null | undefined; showEmail?: boolean }) {
    const getInitials = useInitials();

    if (!user) {
        return <div>Loading...</div>;  // O cualquier otro componente de "cargando" si `user` es null o undefined
    }

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(user.name)}
                    </AvatarFallback>
                )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
            </div>
        </>
    );
}
