import { Button, Input } from "./elements";

export const Footer = (props: React.HTMLAttributes<HTMLElement>) => (
    <footer className="flex gap-3" {...props}>
        <Input />
        <Button />
    </footer>
)