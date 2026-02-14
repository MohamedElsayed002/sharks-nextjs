import { getUserFindPartner } from "@/actions"
import { FindPartnerUser } from "@/components/find-partner-user"


const Page = async ({ params }: { params: Promise<{ id: string }> }) => { 
    const { id } = await params
    return <FindPartnerUser id={id}/>
}

export default Page