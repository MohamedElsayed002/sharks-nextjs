import { Navbar } from "@/components/shared/navbar"


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col p-0">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout