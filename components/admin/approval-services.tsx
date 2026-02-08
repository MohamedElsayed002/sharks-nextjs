import { getPendingServices } from "@/actions"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
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
import { AlertCircle, CheckCircle2, Clock, DollarSign } from "lucide-react"
import { useLocale } from "next-intl"



export const ApprovalServices = () => {
    const router = useRouter()
    const locale = useLocale()
    const { data, isLoading, error } = useQuery<Services[]>({
        queryKey: ['pending-services'],
        queryFn: getPendingServices
    })


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handleReview = (serviceId: string) => {
        router.push(`/${locale}/user/admin/review/${serviceId}`)
    }

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Pending Services</CardTitle>
                    <CardDescription>Loading services awaiting approval...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-16 w-full" />
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
                        Error Loading Services
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Failed to load pending services. Please try again.
                    </p>
                </CardContent>
            </Card>
        )
    }

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Pending Services</CardTitle>
                    <CardDescription>No services pending approval</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">
                            All caught up! No services require review at the moment.
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pending Services
                    <Badge variant="secondary" className="ml-2">
                        {data.length}
                    </Badge>
                </CardTitle>
                <CardDescription>
                    Review and approve services submitted for platform verification
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service ID</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                {/* <TableHead>Revenue Proofs</TableHead> */}
                                <TableHead>Submitted</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((service) => (
                                <TableRow 
                                    key={service._id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleReview(service._id)}
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col gap-1">
                                            {/* <span className="font-semibold">
                                                {getServiceTitle(service)}
                                            </span> */}
                                            <span className="font-semibold">
                                                ID: {service._id.slice(-8)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {service.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {service.isProfitable && (
                                                <Badge 
                                                    variant="secondary" 
                                                    className="w-fit flex items-center gap-1 bg-green-300" 
                                                >
                                                    <DollarSign className="h-3 w-3" />
                                                    Profitable
                                                </Badge>
                                            )}
                                            {service.platformVerificationRequested && (
                                                <Badge 
                                                    variant="default" 
                                                    className="w-fit flex items-center gap-1"
                                                >
                                                    <Clock className="h-3 w-3" />
                                                    Verification Requested
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    {/* <TableCell>
                                        <div className="flex items-center gap-1">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                {service.revenueProofs[0].fileUrl} file
                                            </span>
                                        </div>
                                    </TableCell> */}
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(service.createdAt)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleReview(service._id)
                                            }}
                                        >
                                            Review
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}