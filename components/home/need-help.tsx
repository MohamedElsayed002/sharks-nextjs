import { Phone } from "lucide-react"

export const NeedHelp = () => {
    return (
        <div className="space-y-3 max-w-7xl mx-auto my-20">
            <h1 className="text-3xl font-bold">Need Help?</h1>
            <p className="text-gray-500 text-sm">We understand that buying or selling a digital business isn&apos;t easy. if you have any questions or require assistance, feel free to contact us anytime.</p>
            <div className="flex  gap-10 mt-8">
                <div className="flex gap-6">
                    <Phone className="text-blue-500 border border-blue-500 rounded-full w-8 h-8 p-1"/>
                    <div>
                        <h1 className="text-xl font-semibold">Contact Customer Support</h1>
                        <p className="text-sm text-gray-500">Search our knowledge base for answers to common questions.</p>
                        <p className="text-sm text-blue-500 underline">Go to Sharks Help Center</p>
                    </div>
                </div>
                 <div className="flex gap-6">
                    <Phone className="text-blue-500 border border-blue-500 rounded-full w-8 h-8 p-1"/>
                   <div>
                        <h1 className="text-xl font-semibold">Contact Customer Support</h1>
                        <p className="text-sm text-gray-500">Search our knowledge base for answers to common questions.</p>
                        <p className="text-sm text-blue-500 underline">Go to Sharks Help Center</p>
                    </div>
                </div>
            </div>
        </div>
    )
}