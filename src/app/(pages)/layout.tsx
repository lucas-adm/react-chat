import { UserProvider, MessageProvider, WebSocketProvider, UsersProvider, TypingProvider } from "@/contexts";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <UsersProvider>
                <TypingProvider>
                    <MessageProvider>
                        <WebSocketProvider>
                            {children}
                        </WebSocketProvider>
                    </MessageProvider>
                </TypingProvider>
            </UsersProvider>
        </UserProvider>
    )
}