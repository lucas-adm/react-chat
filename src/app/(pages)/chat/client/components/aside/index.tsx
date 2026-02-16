import { clsx } from 'clsx';
import { Header } from './header';
import { List } from './users';
import { User } from '@/core/models';
import { useRef, useState } from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {
    user: User | null;
    users: User[];
}

export const Aside = ({ user, users, ...rest }: Props) => {

    const [open, setOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const startX = useRef<number | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        const x = e.touches[0].clientX;
        startX.current = x;
        setIsDragging(true);
    }

    const onTouchMove = (e: React.TouchEvent) => {
        if (startX.current === null) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX.current;
        if (!open && diff > 0) setDragOffset(Math.min(diff, window.innerWidth));
        else if (open && diff < 0) setDragOffset(diff);
    }

    const onTouchEnd = (e: React.TouchEvent) => {
        if (e) {
            if (startX.current === null) return;
            const screenWidth = window.innerWidth;
            let finalPosition: number;
            if (open) finalPosition = screenWidth + dragOffset;
            else finalPosition = dragOffset;
            let shouldOpen: boolean;
            if (open) shouldOpen = finalPosition > screenWidth * 0.75;
            else shouldOpen = finalPosition > screenWidth * 0.25;
            setOpen(shouldOpen);
            setIsDragging(false);
            setDragOffset(0);
            startX.current = null;
        }
    }

    const getTransform = () => {
        if (!isDragging) return undefined;
        if (open) return `translateX(${dragOffset}px)`;
        else return `translateX(calc(-100% + ${dragOffset}px))`;
    }

    return (
        <>
            {open
                ? null
                : <div
                    aria-hidden='true'
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    className='insm:z-1 insm:fixed insm:left-0 insm:top-0 insm:h-full insm:w-1/2'
                />
            }
            <aside
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{ transform: getTransform() }}
                className={clsx(
                    'insm:fixed insm:top-0 insm:left-0 insm:w-full insm:h-full insm:z-3',
                    isDragging ? null : 'insm:transition-transform insm:duration-300',
                    isDragging ? null : open ? 'insm:translate-x-0' : 'insm:-translate-x-full',
                    'w-66 h-full p-3 border-r border-neutral-200',
                    'flex-none flex flex-col gap-3',
                    'bg-neutral-200/25 insm:bg-neutral-200',
                )}
                {...rest}
            >
                <Header user={user} />
                <List users={users} />
            </aside>
        </>
    )

}