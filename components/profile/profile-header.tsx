"use client"

import { uploadImage } from "@/actions"
import type { User } from "@/context/user"
import { useAuthStore } from "@/context/user"
import { UploadButton } from "@/utils/uploadthing"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useCallback, useState } from "react"
import { toast } from "sonner"

type ProfileHeaderProps = {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const setUser = useAuthStore((s) => s.setUser)
  const [isUploading, setIsUploading] = useState(false)

  const initial = user.name?.trim().charAt(0)?.toUpperCase() ?? "?"


  const {mutate, isPending} = useMutation({
    mutationFn: async (imageUrl: string) => uploadImage(imageUrl)
  })

  const handleUploadComplete = (imageUrl: string) => {
    mutate(imageUrl,{
      onSuccess: (data) => {
        setUser({ ...user, imageUrl: data.imageUrl })
        toast.success("Image uploaded successfully")
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
      <div className="flex flex-col items-center gap-3 shrink-0">
        <div className="flex h-24 w-24 overflow-hidden rounded-full border-2 border-muted bg-primary/10">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              unoptimized={user.imageUrl.startsWith("https://utfs.io")}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-primary">
              {initial}
            </div>
          )}
        </div>
        <UploadButton
          endpoint="imageUpload"
          onClientUploadComplete={(res) => {
            if (res?.[0]?.url) {
              console.log('dasdsa',res)
              handleUploadComplete(res[0].url)
            } else {
              setIsUploading(false)
            }
          }}
          content={{
            button({ ready }) {
              return isPending
                ? "Uploading..."
                : ready
                  ? "Change photo"
                  : "Upload photo"
            },
          }}
          appearance={{
            button: "ut-ready:bg-primary ut-uploading:bg-muted-foreground/50 h-9 rounded-md px-4 text-sm font-medium text-primary-foreground after:bg-primary",
          }}
        />
      </div>
      <div className="min-w-0 text-center sm:text-left">
        <h1 className="truncate text-2xl font-bold text-foreground">{user.name}</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        {user.role && (
          <span className="mt-1 inline-block rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {user.role}
          </span>
        )}
      </div>
    </div>
  )
}
