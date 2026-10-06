import { RealtimeProvider } from "./providers/realtime-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <>
        <RealtimeProvider />
        {children }
        </>
    )
}