import { SingleService } from "@/components/single-service"

interface PageProps {
    params: Promise<{ serviceId: string }>
}

const Page = async ({ params }: PageProps) => {

    const { serviceId } = await params

    return <SingleService serviceId={serviceId} />
}

export default Page