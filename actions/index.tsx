"use server"

export const getPendingServices = async () => {
    const response = await fetch(`${process.env.BASE_URL}/services`)
    const data = await response.json()
    return data
}

export const getSingleReviewService = async (id: string) => {
    const response = await fetch(`${process.env.BASE_URL}/services/single-service/${id}`)
    const data = await response.json()
    return data
}

export const getVerifiedServices = async () => {
    const response = await fetch(`${process.env.BASE_URL}/services/verified-services`)
    const data = await response.json()
    return data
}

export const getAllUsers = async () => {
    const response = await fetch(`${process.env.BASE_URL}/user/all-users`)
    const data = await response.json()
    return data
}

export const updateServiceStatus = async(id: string,verification: boolean) => {
    const response = await fetch(`${process.env.BASE_URL}/services/update-service-verification/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({verification})
    })

    const data = await response.json()
    return data
}