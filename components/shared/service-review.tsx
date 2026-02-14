"use client"

import { deleteService, getSingleReviewService, updateServiceStatus } from "@/actions"
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
import { useLocale, useTranslations } from "next-intl"

export const ServiceReview = ({ id }: { id: string }) => {
    const router = useRouter()
    const t = useTranslations("serviceReview")
    const [adminNotes, setAdminNotes] = useState("")
    const queryClient = useQueryClient()
    const locale = useLocale()

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
            toast.success(t("statusUpdatedSuccess"))
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const { mutate: deleteServiceMutate, isPending: deletingService } = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            const data = await deleteService(id)

            if ("error" in data) {
                throw new Error(data.message)
            }

            return data
        },
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ['verified-services'] })
            queryClient.invalidateQueries({ queryKey: ['pending-services'] })
            router.push(`/${locale}/user/admin`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    if (!service) return

    const formatDate = (dateString: string) => {
        const dateLocale = locale === "ar" ? "ar-SA" : "en-US"
        return new Date(dateString).toLocaleDateString(dateLocale, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }




    if (!service.category) {
        return <h1>{t("serviceNotFound")}</h1>
    }


    const handleApprove = () => {
        if (!service._id) return
        updateStatus({ id: service._id, verification: true })
    }

    const handleDelete = (id: string) => {
        deleteServiceMutate({ id: id })
    }

    console.log(service)

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
                        <h1 className="text-3xl font-bold">{t("title")}</h1>
                        <p className="text-muted-foreground">
                            {t("subtitle")}
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
                            <CardTitle>{t("serviceInformation")}</CardTitle>
                            <CardDescription>
                                {t("serviceInformationDesc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">{t("serviceId")}</Label>
                                <p className="font-mono text-sm">{service._id}</p>
                            </div>

                            <Separator />

                            <div>
                                <Label className="text-muted-foreground">{t("category")}</Label>
                                <div className="mt-1">
                                    <Badge variant="outline">{service.category}</Badge>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <Label className="text-muted-foreground">{t("owner")}</Label>
                                <p className="font-mono text-sm">{service.owner}</p>
                            </div>

                            <Separator />

                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {service.isProfitable ? t("profitable") : t("notProfitable")}
                                    </span>
                                </div>
                                {!service.platformVerificationRequested && (
                                    <Badge variant="default">
                                        {t("verificationRequested")}
                                    </Badge>
                                )}
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {t("submitted")}
                                    </Label>
                                    <p className="text-sm mt-1">{formatDate(service.createdAt)}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {t("lastUpdated")}
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
                                {t("serviceDescriptions")}
                            </CardTitle>
                            <CardDescription>
                                {t("availableInLanguages", { count: service.details.length })}
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
                                            <Label className="text-muted-foreground">{t("titleLabel")}</Label>
                                            <p className="text-lg font-semibold mt-1">
                                                {detail.title}
                                            </p>
                                        </div>
                                        <Separator />
                                        <div>
                                            <Label className="text-muted-foreground">{t("description")}</Label>
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
                                <CardTitle>{t("incomeSources")}</CardTitle>
                                <CardDescription>
                                    {t("incomeSourcesDesc")}
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
                                <CardTitle>{t("coverImage")}</CardTitle>
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
                                    {t("revenueProofs")}
                                </CardTitle>
                                <CardDescription>
                                    {t("documentsSubmitted", { count: service.revenueProofs.length })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {service.revenueProofs.map((proof, index) => {
                                        const isImage = proof.fileType?.startsWith("image/")
                                        return (
                                            <div
                                                key={proof.fileId || index}
                                                className="overflow-hidden rounded-lg border hover:bg-muted/50"
                                            >
                                                {isImage ? (
                                                    <div className="flex flex-col sm:flex-row gap-3 p-3">
                                                        <a
                                                            href={proof.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block shrink-0"
                                                        >
                                                            <img
                                                                src={proof.fileUrl}
                                                                alt={t("revenueProofAlt", { index: index + 1 })}
                                                                className="h-40 w-auto max-w-full rounded-md object-contain border bg-muted"
                                                            />
                                                        </a>
                                                        <div className="flex flex-1 flex-col justify-between gap-2">
                                                            <div>
                                                                <p className="font-medium text-sm">{proof.source}</p>
                                                                <p className="text-xs text-muted-foreground">{proof.fileType}</p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button variant="outline" size="sm" asChild>
                                                                    <a href={proof.fileUrl} target="_blank" rel="noopener noreferrer">
                                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                                        {t("view")}
                                                                    </a>
                                                                </Button>
                                                                <Button variant="outline" size="sm" asChild>
                                                                    <a href={proof.fileUrl} download>
                                                                        <Download className="h-4 w-4 mr-2" />
                                                                        {t("download")}
                                                                    </a>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between p-3">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <p className="font-medium text-sm">{proof.source}</p>
                                                                <p className="text-xs text-muted-foreground">{proof.fileType}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm" asChild>
                                                                <a href={proof.fileUrl} target="_blank" rel="noopener noreferrer">
                                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                                    {t("view")}
                                                                </a>
                                                            </Button>
                                                            <Button variant="outline" size="sm" asChild>
                                                                <a href={proof.fileUrl} download>
                                                                    <Download className="h-4 w-4 mr-2" />
                                                                    {t("download")}
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
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
                            <CardTitle>{t("adminNotes")}</CardTitle>
                            <CardDescription>
                                {t("adminNotesDesc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder={t("adminNotesPlaceholder")}
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                rows={4}
                            />
                        </CardContent>
                    </Card>

                    {/* Approval Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("reviewActions")}</CardTitle>
                            <CardDescription>
                                {service.platformVerificationRequested ? t("reviewActionsDeleteOnly") : t("reviewActionsApproveOrReject")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-3 space-y-4">
                            {!service.platformVerificationRequested && (
                                <Button
                                    className="flex-1"
                                    onClick={handleApprove}
                                    disabled={isLoading}
                                >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    {t("approveService")}
                                </Button>
                            )}
                            <Button onClick={() => handleDelete(service._id)} variant="destructive" className="flex-1">
                                {deletingService ? t("deleting") : t("delete")}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("quickStats")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t("languages")}</span>
                                <span className="font-medium">{service.details.length}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t("incomeSources")}</span>
                                <span className="font-medium">{service.incomeSources?.length || 0}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t("revenueProofsCount")}</span>
                                <span className="font-medium">{service.revenueProofs.length || 0}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}