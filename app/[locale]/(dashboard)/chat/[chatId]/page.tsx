import { ChatRoom } from "@/components/chat/ChatRoom"

export default async function ChatConversationPage({
  params,
}: {
  params: Promise<{ chatId: string }>
}) {
  const { chatId } = await params
  return (
    <div className="mx-auto w-full max-w-7xl min-h-[100dvh] flex flex-col px-2 py-2 sm:px-4 sm:py-4 md:px-6 lg:px-8 pb-24 sm:pb-20">
      <ChatRoom conversationId={chatId} />
    </div>
  )
}
