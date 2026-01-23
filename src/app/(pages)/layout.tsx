import { MessageProvider } from "@/context/Messages";
import { UserProvider } from "@/context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <MessageProvider>
                {children}
            </MessageProvider>
        </UserProvider>
    )
}