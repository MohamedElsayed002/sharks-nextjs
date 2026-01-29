"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { ApprovalServices } from "./approval-services"

export const Admin = () => {

    const [activeBar, setActiveNavbar] = useState<"approval" | "all-users" | "all-services">("approval")


    return (
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
            {/* First div */}
            <div className="bg-blue-500 border p-10 col-span-12 lg:col-span-3">
                <div onClick={() => setActiveNavbar("approval")}>Approve</div>
                <div onClick={() => setActiveNavbar("all-users")}>All Users</div>
                <div onClick={() => setActiveNavbar("all-services")}>All Services</div>
            </div>

            {/* Second div */}
            <div className="border p-10 col-span-12 lg:col-span-9">
                {activeBar === "approval" && <ApprovalServices />}
                {activeBar === "all-services" && <h1>All Services</h1>}
                {activeBar === "all-users" && <h1>All Users</h1>}
            </div>
        </div>
    )
}