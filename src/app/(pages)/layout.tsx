import { UserProvider } from "@/context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}