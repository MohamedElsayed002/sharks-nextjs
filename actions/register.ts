"use server"

type RegisterProp = {
    email: string 
    password: string
    name: string
    location: string
    gender: "Male" | "Female"
    phone: string
}

export async function RegisterAction({email,password,name,location,gender,phone}: RegisterProp) {
    const response = await fetch(`${process.env.BASE_URL}/auth/register`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password,name,location,gender,phone})
    })

    const payload = await response.json()

    return payload
}