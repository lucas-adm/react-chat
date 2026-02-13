import { IconPencil } from "@tabler/icons-react";

export const Icon = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        aria-hidden="true"
        className="pointer-events-none select-none relative w-fit p-0.5 rounded-full flex items-center"
        {...props}
    >
        <IconPencil
            size={18}
            className="text-neutral-600"
        />
    </div>
)