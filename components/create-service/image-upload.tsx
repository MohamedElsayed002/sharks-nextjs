"use client"

import { UseFormReturn } from "react-hook-form"
import { FormSchema } from "."
import { Form, FormControl, FormLabel, FormField, FormMessage, FormItem, FormDescription } from "../ui/form"
import { UploadButton, UploadDropzone } from "@/utils/uploadthing"
import { useState } from "react"
import { Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"


interface Props {
    form: UseFormReturn<FormSchema>
}


export const UploadImage = ({ form }: Props) => {

    const [uploadedImageurl, setUploadImageUrl] = useState<string>(
        form.getValues("imageUrl") || ""
    )

    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string>("")


    return (
        <Form {...form}>
            <div className="space-y-6">
                <div className='text-center'>
                    <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 mb-4'>
                        <ImageIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className='text-2xl font-semibold mb-2'>Upload Service Image</h3>
                    <p className='text-sm max-w-md mx-auto'>
                        Choose a high-quality image that represents your service. This will
                        be displayed to potential customers
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name='imageUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=''>Service Image</FormLabel>
                            <FormControl>
                                <div className="space-y-4">
                                    {!uploadedImageurl ? (
                                        <div className='border-2 border-dashed  rounded-xl p-8 bg-gray-200 hover:bg-gray-400 transition-colors'>
                                            <UploadDropzone
                                                endpoint="imageUpload"
                                                onClientUploadComplete={(res) => {
                                                    if (res && res[0]) {
                                                        const uploadedUrl = res[0].url
                                                        setUploadImageUrl(uploadedUrl)
                                                        form.setValue('imageUrl', uploadedUrl)
                                                        setUploadError("")
                                                        setIsUploading(false)
                                                    }
                                                }}
                                                onUploadError={(error: Error) => {
                                                    setUploadError(error.message)
                                                    setIsUploading(false)
                                                }}
                                                onUploadBegin={() => {
                                                    setIsUploading(true)
                                                    setUploadError("")
                                                }}
                                                appearance={{
                                                    container: "border-none bg-transparent",
                                                    uploadIcon: "text-blue-400",
                                                    label: "text-bluue-300 hover:text-blue-400 transition-colors",
                                                    allowedContent: "text-blue-500 text-xs",
                                                    button: "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white ut-ready:bg-gradient-to-r ut-uploading:bg-slate-700",
                                                }}
                                                config={{ mode: "auto" }}
                                            />

                                            {isUploading && (
                                                <div className='text-center mt-4'>
                                                    <div className='inline-flex items-center gap-2 text-blue-400'>
                                                        <div className='w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin' />
                                                        <span className='text-sm'>Uploading your image.</span>
                                                    </div>
                                                </div>
                                            )}

                                            {uploadError && (
                                                <div className='flex items-center justify-center gap-2 mt-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3'>
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className='text-sm'>{uploadError}</span>
                                                </div>
                                            )}

                                        </div>
                                    ) : (
                                        <div className='space-y-4'>
                                            <div className='relative group rounded-xl overflow-hidden border-2 border-green-500/30 bg-gray-200'>
                                                <Image
                                                    src={uploadedImageurl}
                                                    alt="Service Preview"
                                                    width={600}
                                                    height={600}
                                                    className="w-full h-auto object-cover"
                                                />

                                                <div className='absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-80 transition-opacity'>
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <button
                                                            type='button'
                                                            onClick={() => {
                                                                setUploadImageUrl("")
                                                                form.setValue("imageUrl", "")
                                                            }}
                                                            className="w-full bg-red-500 hover:bg-red-600 text-white z-50 opacity-100 py-2 px-4 rounded-lg"
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>

                                                {/*  */}
                                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/90 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Uploaded
                                                </div>
                                            </div>

                                            <div className='text-center'>
                                                <UploadButton
                                                    endpoint="imageUpload"
                                                    onClientUploadComplete={(res) => {
                                                        if (res && res[0]) {
                                                            const uploadedUrl = res[0].url
                                                            setUploadImageUrl(uploadedUrl)
                                                            form.setValue("imageUrl", uploadedUrl)
                                                            setUploadError("")
                                                            setIsUploading(false)
                                                        }
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        setUploadError(error.message)
                                                        setIsUploading(false)
                                                    }}
                                                    onUploadBegin={() => {
                                                        setIsUploading(true)
                                                        setUploadError("")
                                                    }}
                                                    appearance={{
                                                        button: "bg-violet-600 hover:bg-violet-700 text-white ut-ready:bg-violet-600 ut-uploading:bg-slate-700 px-6 py-2 rounded-lg",
                                                        allowedContent: "text-slate-500 text-xs",
                                                    }}
                                                />
                                                <p className="mt-2 text-sm">
                                                    Upload a different image
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription className="text-sm">
                                    PNG, JPG, max 4MB
                            </FormDescription>
                        </FormItem>
                    )}
                />
            </div>
        </Form>
    )
}