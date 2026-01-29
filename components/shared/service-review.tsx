"use client"

import { getSingleReviewService, updateServiceStatus } from "@/actions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { notFound, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    CheckCircle2,
    XCircle,
    ArrowLeft,
    DollarSign,
    FileText,
    Globe,
    Calendar,
    ExternalLink,
    Download
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { toast } from "sonner"

export const ServiceReview = ({ id }: { id: string }) => {
    const router = useRouter()
    const [adminNotes, setAdminNotes] = useState("")
    const queryClient = useQueryClient()

    const { data: service, error, isLoading } = useQuery<Services>({
        queryKey: ['review-service', id],
        queryFn: () => getSingleReviewService(id)
    })

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: async ({ id, verification }: { id: string; verification: boolean }) => {
            updateServiceStatus(id, verification)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['review-service', id] })
            queryClient.invalidateQueries({ queryKey: ["pending-services"] })
            toast.success("Service status updated successfully")
        },
        onError: (error) => {
            console.log(error)
        }
    })

    if (!service) return

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }




    if (!service.category) {
        return <h1>Service Not found</h1>
    }


    const handleApprove = () => {
        if (!service._id) return
        updateStatus({ id: service._id, verification: true })
    }

    const handleReject = () => {
        if (!service?._id) return
        updateStatus({ id: service._id, verification: false })
    }



    return (
        <div className="max-w-7xl mx-auto py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Service Review</h1>
                        <p className="text-muted-foreground">
                            Review and approve service submission
                        </p>
                    </div>
                </div>
                <Badge variant="secondary" className="h-fit">
                    {service?.verificationLevel}
                </Badge>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Service Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Information</CardTitle>
                            <CardDescription>
                                Basic details about the submitted service
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">Service ID</Label>
                                <p className="font-mono text-sm">{service._id}</p>
                            </div>

                            <Separator />

                            <div>
                                <Label className="text-muted-foreground">Category</Label>
                                <div className="mt-1">
                                    <Badge variant="outline">{service.category}</Badge>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <Label className="text-muted-foreground">Owner</Label>
                                <p className="font-mono text-sm">{service.owner}</p>
                            </div>

                            <Separator />

                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {service.isProfitable ? 'Profitable' : 'Not Profitable'}
                                    </span>
                                </div>
                                {!service.platformVerificationRequested && (
                                    <Badge variant="default">
                                        Verification Requested
                                    </Badge>
                                )}
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Submitted
                                    </Label>
                                    <p className="text-sm mt-1">{formatDate(service.createdAt)}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Last Updated
                                    </Label>
                                    <p className="text-sm mt-1">{formatDate(service.updatedAt)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Multi-language Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Service Descriptions
                            </CardTitle>
                            <CardDescription>
                                Available in {service.details.length} language(s)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue={service.details[0]?.lang || "en"}>
                                <TabsList>
                                    {service.details.map((detail) => (
                                        <TabsTrigger
                                            key={detail.lang}
                                            value={detail.lang}
                                        >
                                            {detail.lang.toUpperCase()}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {service.details.map((detail) => (
                                    <TabsContent
                                        key={detail.lang}
                                        value={detail.lang}
                                        className="space-y-4 mt-4"
                                    >
                                        <div>
                                            <Label className="text-muted-foreground">Title</Label>
                                            <p className="text-lg font-semibold mt-1">
                                                {detail.title}
                                            </p>
                                        </div>
                                        <Separator />
                                        <div>
                                            <Label className="text-muted-foreground">Description</Label>
                                            <p className="text-sm mt-1 whitespace-pre-wrap">
                                                {detail.description}
                                            </p>
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Income Sources */}
                    {service.incomeSources && service.incomeSources.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Income Sources</CardTitle>
                                <CardDescription>
                                    Revenue streams for this service
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {service.incomeSources.map((source, index) => (
                                        <Badge key={index} variant="secondary">
                                            {source}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {service.imageUrl && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Cover Image Service</CardTitle>
                                <CardContent className="mx-auto mt-5">
                                    <Image src={service.imageUrl} width={700} height={500} alt={service.details[0].title} />
                                </CardContent>
                            </CardHeader>
                        </Card>
                    )}

                    {/* Revenue Proofs */}
                    {service.revenueProofs && service.revenueProofs.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Revenue Proofs
                                </CardTitle>
                                <CardDescription>
                                    {!!service.revenueProofs} document(s) submitted
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div
                                        key={service.revenueProofs[0].fileId}
                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-sm">
                                                    {service.revenueProofs[0].source}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {service.revenueProofs[0].fileType}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={service.revenueProofs[0].fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    View
                                                </a>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={service.revenueProofs[0].fileUrl}
                                                    download
                                                >
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar - Actions */}
                <div className="space-y-6">
                    {/* Admin Notes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Notes</CardTitle>
                            <CardDescription>
                                Internal notes (optional)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Add any internal notes about this review..."
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                rows={4}
                            />
                        </CardContent>
                    </Card>

                    {/* Approval Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Review Actions</CardTitle>
                            <CardDescription>
                                Approve or reject this service
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                className="w-full"
                                onClick={handleApprove}
                                disabled={isLoading}
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve Service
                            </Button>

                            <Separator />

                            {/* <div className="space-y-2">
                                <Label>Rejection Reason</Label>
                                <Textarea
                                    placeholder="Provide a reason for rejection..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    rows={3}
                                />
                            </div> */}

                            {/* <Button
                                className="w-full"
                                variant="destructive"
                                onClick={handleReject}
                                disabled={isLoading || !rejectionReason.trim()}
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Service
                            </Button> */}
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Languages</span>
                                <span className="font-medium">{service.details.length}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Income Sources</span>
                                <span className="font-medium">{service.incomeSources?.length || 0}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Revenue Proofs</span>
                                <span className="font-medium">{service.revenueProofs.length || 0}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}