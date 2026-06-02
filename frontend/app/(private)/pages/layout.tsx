import Footer from "@/shared/components/footer";
import Navbar from "@/shared/components/navbar";
import SidebarHeaderBar from "@/shared/components/sidebar-header-bar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Navbar />
      <SidebarInset className="flex flex-col">
        <SidebarHeaderBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
