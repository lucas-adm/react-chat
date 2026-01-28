import { UserProvider, MessageProvider, WebSocketProvider } from "@/contexts";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <WebSocketProvider>
            <UserProvider>
                <MessageProvider>
                    {children}
                </MessageProvider>
            </UserProvider>
        </WebSocketProvider>
    )
}