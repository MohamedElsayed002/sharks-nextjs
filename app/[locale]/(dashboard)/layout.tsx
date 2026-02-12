import Footer from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import { Navbar } from "@/components/shared/navbar"


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* <Header/> */}
            <Navbar />
            <main className="flex-1 flex flex-col p-0">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default DashboardLayout