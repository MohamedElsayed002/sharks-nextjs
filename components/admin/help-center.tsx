"use client"

import { useState } from "react"
import { helpCenterGetAll } from "@/actions"
import { useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  AlertCircle,
  HelpCircle,
  Mail,
  ExternalLink,
  FileText,
  Paperclip,
  Calendar,
  Eye,
} from "lucide-react"

function isImageMime(type: string): boolean {
  return type?.startsWith?.("image/") ?? false
}

function isImageByName(name: string): boolean {
  const lower = name.toLowerCase()
  return (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".gif")
  )
}

export const HelpCenter = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery<HelpCenter[]>({
    queryKey: ["help-center"],
    queryFn: helpCenterGetAll,
  })

  const selected = data?.find((r) => r._id === selectedId)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Help Center Requests</CardTitle>
          <CardDescription>Loading support requests...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Error Loading Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Failed to load help center requests. Please try again.
          </p>
        </CardContent>
      </Card>
    )
  }

  const requests = Array.isArray(data) ? data : []

  if (requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help Center Requests
          </CardTitle>
          <CardDescription>Support requests submitted by users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <HelpCircle className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No help center requests yet.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help Center Requests
            <Badge variant="secondary" className="ml-2">
              {requests.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            View and respond to support requests from users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Attachments</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow
                    key={req._id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedId(req._id)}
                  >
                    <TableCell>
                      <span className="text-sm font-medium">{req.email}</span>
                    </TableCell>
                    <TableCell>
                      <span className="line-clamp-1 text-sm">{req.subject}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <Paperclip className="h-3 w-3" />
                        {req.attachments?.length ?? req.attachmentUrls?.length ?? 0}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(req.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedId(req._id)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Sheet */}
      <Sheet open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
        >
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.subject}</SheetTitle>
                <SheetDescription>
                  Submitted {formatDate(selected.createdAt)}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 px-4 pb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email
                  </div>
                  <a
                    href={`mailto:${selected.email}`}
                    className="block rounded-md border p-3 text-sm text-primary hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>

                {selected.listingUrl && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      Listing URL
                    </div>
                    <a
                      href={selected.listingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate rounded-md border p-3 text-sm text-primary hover:underline"
                    >
                      {selected.listingUrl}
                    </a>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Description
                  </div>
                  <div className="rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap">
                    {selected.description}
                  </div>
                </div>

                {(selected.attachments?.length ?? selected.attachmentUrls?.length ?? 0) > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      Attachments
                    </div>
                    <div className="space-y-3">
                      {(selected.attachments ?? []).map((att, idx) => {
                        const url = att.url
                        const name = att.name ?? `Attachment ${idx + 1}`
                        const showAsImage =
                          isImageMime(att.fileType ?? "") || isImageByName(name)
                        return (
                          <div
                            key={att._id ?? idx}
                            className="overflow-hidden rounded-lg border"
                          >
                            {showAsImage ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <img
                                  src={url}
                                  alt={name}
                                  className="h-48 w-full object-contain bg-muted"
                                />
                              </a>
                            ) : null}
                            <div className="flex items-center justify-between gap-2 p-3">
                              <span className="truncate text-sm font-medium">
                                {name}
                              </span>
                              <div className="flex gap-2 shrink-0">
                                <Button variant="outline" size="sm" asChild>
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View
                                  </a>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <a href={url} download>
                                    Download
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {(!selected.attachments || selected.attachments.length === 0) &&
                        selected.attachmentUrls?.map((url, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <span className="truncate text-sm">
                              {url.split("/").pop() ?? `File ${idx + 1}`}
                            </span>
                            <div className="flex gap-2 shrink-0">
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View
                                </a>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <a href={url} download>
                                  Download
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
