import { ServiceReview } from "@/components/shared/service-review"

const Page = async ({
  params,
}: {
  params: Promise<{ serviceId: string }>
}) => {

  const { serviceId } = await params  

  return <ServiceReview id={serviceId}/>
}

export default Page
