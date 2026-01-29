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