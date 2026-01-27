import { NextResponse } from "next/server"


export async function POST(req: Request) {
    // const { imageUrl,token ,category, isProfitable, details,averageMonthlyRevenue,averageMonthlyExpenses,netProfit,incomeSources,revenueProofs } = await req.json()
    const body = await req.json()
    console.log(body.data)
    const response = await fetch(`${process.env.BASE_URL}/services`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${body.token}`
        },
        body: JSON.stringify(body.data)
    })

    const data = await response.json()

    if("error" in data || data.statusCode === 500) {
        return NextResponse.json({
            success:false,
            message: data.message
        })
    }

    return NextResponse.json({
        success: true,
        data
    })
}