

const Page = async ({
    params,
  }: {
    params: Promise<{ chatId: string }>
  }) => {

    const { chatId } = await params

    return (
        <h1>Chat Page {chatId}</h1>
    )
}

export default Page