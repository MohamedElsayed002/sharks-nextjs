
interface HelpCenter {
  _id: string
  email: string
  listingUrl?: string
  subject: string
  description: string
  attachmentUrls?: string[]
  attachments?: {
    url: string
    name: string
    _id?: string
    fileType?: string
  }[]
  createdAt: string
  updatedAt: string
  __v?: number
}