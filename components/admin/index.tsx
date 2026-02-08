"use client"

import { useEffect, useState } from "react"
import { ApprovalServices } from "./approval-services"
import { VerifiedServices } from "./verified-services"
import { AllUsers } from "./all-users"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { 
    Clock, 
    CheckCircle, 
    Users,
    ChevronRight,
    HelpCircle
} from "lucide-react"
import { HelpCenter } from "./help-center"

type NavOption = "approval" | "all-users" | "all-services" | "help-center"

interface NavItem {
    id: NavOption
    label: string
    icon: React.ReactNode
    description: string
}

const NAV_ITEMS: NavItem[] = [
    {
        id: "approval",
        label: "Pending Services",
        icon: <Clock className="h-5 w-5" />,
        description: "Review pending submissions"
    },
    {
        id: "all-services",
        label: "Approved Services",
        icon: <CheckCircle className="h-5 w-5" />,
        description: "View verified services"
    },
    {
        id: "all-users",
        label: "All Users",
        icon: <Users className="h-5 w-5" />,
        description: "Manage user accounts"
    },
    {
        id: "help-center",
        label: "Help Center",
        icon: <HelpCircle className="h-5 w-5" />,
        description: "View help center requests"
    }
]

const STORAGE_KEY = "admin-active-nav"

export const Admin = () => {
    const [activeBar, setActiveNavbar] = useState<NavOption>("approval")
    const [isClient, setIsClient] = useState(false)

    // Initialize from localStorage on client side
    useEffect(() => {
        setIsClient(true)
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored && ["approval", "all-users", "all-services", "help-center"].includes(stored)) {
            setActiveNavbar(stored as NavOption)
        }
    }, [])

    // Save to localStorage whenever activeBar changes
    useEffect(() => {
        if (isClient) {
            localStorage.setItem(STORAGE_KEY, activeBar)
        }
    }, [activeBar, isClient])

    const handleNavClick = (navId: NavOption) => {
        setActiveNavbar(navId)
    }

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-4 lg:p-6">
            {/* Sidebar Navigation */}
            <div className="col-span-12 lg:col-span-3">
                <Card className="p-2">
                    <div className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeBar === item.id
                            
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={cn(
                                        "w-full text-left rounded-lg transition-all duration-200",
                                        "hover:bg-accent group",
                                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                                    )}
                                >
                                    <div className="flex items-center gap-3 p-3">
                                        <div className={cn(
                                            "flex-shrink-0 transition-colors",
                                            isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                        )}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={cn(
                                                "font-medium text-sm truncate",
                                                isActive ? "text-primary-foreground" : "text-foreground"
                                            )}>
                                                {item.label}
                                            </div>
                                            <div className={cn(
                                                "text-xs truncate mt-0.5",
                                                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                                            )}>
                                                {item.description}
                                            </div>
                                        </div>
                                        <ChevronRight className={cn(
                                            "h-4 w-4 flex-shrink-0 transition-all",
                                            isActive ? "text-primary-foreground opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                                        )} />
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-9">
                {activeBar === "approval" && <ApprovalServices />}
                {activeBar === "all-services" && <VerifiedServices />}
                {activeBar === "all-users" && <AllUsers />}
                {activeBar === "help-center" && <HelpCenter />}
            </div>
        </div>
    )
}