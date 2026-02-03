import { forwardRef } from "react";

export const UnreadsSeparator = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>((props, ref) => (
    <li ref={ref} className="mx-auto font-medium text-xs text-neutral-400" {...props} />
))

UnreadsSeparator.displayName = "UnreadsSeparator";