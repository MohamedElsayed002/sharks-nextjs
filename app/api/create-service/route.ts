import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const body = await req.json()
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