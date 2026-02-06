import { UserProvider, MessageProvider, WebSocketProvider, UsersProvider } from "@/contexts";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <UsersProvider>
                <MessageProvider>
                    <WebSocketProvider>
                        {children}
                    </WebSocketProvider>
                </MessageProvider>
            </UsersProvider>
        </UserProvider>
    )
}