"use server"

type LoginProp = {
    email: string 
    password: string
}

export async function LoginAction({email,password}: LoginProp) {
    const response = await fetch(`${process.env.BASE_URL}/auth/login`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({email,password})
    })

    const payload: LoginResponse = await response.json()

    return payload

}