import { Check } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"

export const Interests = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl font-bold my-14">What would you like to do?</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-blue-100/80 text-center items-center space-y-4 p-10">
                    <h1 className="text-2xl font-bold">Buy & Sell End-to-End</h1>
                    <p className="max-w-md text-center mx-auto">List, connect, and sell your business with end-to-end advisory through Sharks website</p>
                    <ul className="flex gap-3 justify-center">
                        <li><Check className="inline-flex text-green-500" /> 425,00 AI Buyer Matches Weekly</li>
                        <li><Check className="inline-flex text-green-500" /> Expert Advisory & Brokerage</li>
                    </ul>
                    <div className="flex gap-4 justify-center">
                        <Button variant='outline'>Browse Businesses</Button>
                        <Button>Sell Now</Button>
                    </div>
                    <Image className="rounded-lg mx-auto px-8" src="/perfume.jpg" width={550} height={200} alt="ds  " />
                </div>
                <div className="bg-green-100/80 text-center space-y-4 p-10">
                    <h1 className="text-2xl font-bold">Select Services for Your Deal</h1>
                    <p className="max-w-md text-center mx-auto">Choose individual services like escrow payments, or legal contracts to complete your business transactions.</p>
                    <ul className="flex gap-3 flex-wrap justify-center">
                        <li><Check className="inline-flex text-green-500" /> Payments & Escrow</li>
                        <li><Check className="inline-flex text-green-500" /> Legal</li>
                        <li><Check className="inline-flex text-green-500" /> Finance</li>
                        <li><Check className="inline-flex text-green-500" /> Insurance</li>
                        {/* <li><Check className="inline-flex text-green-500" /> Verification & Assessment</li> */}
                    </ul>
                    <div className="flex gap-4 justify-center">
                        <Button variant='outline'>View Services</Button>
                    </div>
                    <Image className="rounded-lg mx-auto px-8" src="/perfume.jpg" width={550} height={200} alt="ds  " />
                </div>
            </div>
        </div>
    )
} 