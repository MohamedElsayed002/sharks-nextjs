import { ChatRoom } from "@/components/chat/ChatRoom"

export default async function ChatConversationPage({
  params,
}: {
  params: Promise<{ chatId: string }>
}) {
  const { chatId } = await params
  return (
    <div className="min-w-7xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col px-4 py-4 md:px-6 lg:px-8">
      <ChatRoom conversationId={chatId} />
    </div>
  )
}
