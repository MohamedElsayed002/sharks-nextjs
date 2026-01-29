

interface Services {
    category: string 
    createdAt: string 
    details: {
        lang: string 
        title: string 
        description: string
    }[]
    incomeSources: string[]
    isProfitable: boolean
    owner: string 
    platformVerificationRequested: boolean
    revenueProofs: {
        fileUrl: string 
        fileId: string 
        fileType: string 
        source: string 
    }
    updatedAt: string 
    verificationLevel: string 
    _id: string
    __v: number
}