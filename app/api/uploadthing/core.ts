import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing()

const auth = async () => {
    const data = { user: '1', id: 2}
    return data?.user
}


// FileRouter for your app, can contain multiple FileRoutes 
export const ourFileRouter = {
    imageUpload: f({
        image: {
            maxFileSize: '4MB',
            maxFileCount: 1
        },
    })
        // Set Permissions and file types for this FileRoute 
        .middleware(async () => {
            const user = await auth()

            if (!user) throw new UploadThingError('Unauthorized')

            return { user }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code runs on your server after upload 
            console.log('Upload complete for userId:', metadata.user)

            console.log('file url', file.ufsUrl)

            return { uploadedBy: metadata.user }
        }),

    audioUpload: f({
        audio: {
            maxFileSize: '16MB',
            maxFileCount: 2
        }
    })
        .middleware(async () => {
            const user = await auth()
            if (!user) throw new UploadThingError("Unauthorized")
            return { userId: user }
        })
        .onUploadComplete(async ({ metadata }) => {
            return { uploadedBy: metadata.userId}
        }),
    pdfUpload: f({
        pdf: {
            maxFileSize: '16MB',
            maxFileCount: 1
        }
    })
        .middleware(async () => {
            const user = await auth()
            if (!user) throw new UploadThingError("Unauthorized")
            return { userId: user }
        })
        .onUploadComplete(async ({ metadata }) => {
            console.log('Audio uploaded by', metadata)
            return { uploadedBy: metadata.userId }
        }),

    // Revenue proof documents (bank statements, invoices, etc.)
    revenueProof: f({
        image: { maxFileSize: "4MB", maxFileCount: 4 },
        pdf: { maxFileSize: "8MB", maxFileCount: 4 },
    })
        .middleware(async () => {
            const user = await auth()
            if (!user) throw new UploadThingError("Unauthorized")
            return { userId: user }
        })
        .onUploadComplete(async ({ file }) => {
            console.log("Revenue proof uploaded:", file.ufsUrl)
            return { url: file.ufsUrl }
        }),

    // Support request attachments - no auth required (help center form)
    supportAttachment: f({
        image: { maxFileSize: "4MB", maxFileCount: 4 },
        pdf: { maxFileSize: "8MB", maxFileCount: 4 },
    })
        .middleware(async () => ({}))
        .onUploadComplete(async ({ file }) => {
            console.log("Support attachment uploaded:", file.ufsUrl)
            return { url: file.ufsUrl }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter