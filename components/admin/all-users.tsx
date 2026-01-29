"use client"

import { getAllUsers } from "@/actions"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
    AlertCircle, 
    Trash2, 
    Users, 
    Search,
    ShieldCheck,
    UserCircle,
    Calendar,
    Mail,
    Phone,
    MapPin
} from "lucide-react"

interface User {
    createdAt: string 
    email: string 
    gender: "Male" | "Female"
    location: string 
    name: string 
    phone: string 
    role: "User" | "Admin" 
    updatedAt: string 
    __v: number 
    _id: string
}

// Mock delete function - replace with your actual API call
const deleteUser = async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete user')
    return response.json()
}

export const AllUsers = () => {
    const queryClient = useQueryClient()
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState<"all" | "User" | "Admin">("all")
    const [genderFilter, setGenderFilter] = useState<"all" | "Male" | "Female">("all")
    const [userToDelete, setUserToDelete] = useState<User | null>(null)

    const { data, isLoading, error } = useQuery<User[]>({
        queryKey: ['all-users'],
        queryFn: getAllUsers
    })

    // const deleteMutation = useMutation({
    //     mutationFn: deleteUser,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['all-users'] })
    //         toast({
    //             title: "User deleted",
    //             description: "The user has been successfully removed.",
    //         })
    //         setUserToDelete(null)
    //     },
    //     onError: () => {
    //         toast({
    //             title: "Error",
    //             description: "Failed to delete user. Please try again.",
    //             variant: "destructive",
    //         })
    //     }
    // })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // const handleDelete = (user: User) => {
    //     setUserToDelete(user)
    // }

    // const confirmDelete = () => {
    //     if (userToDelete) {
    //         deleteMutation.mutate(userToDelete._id)
    //     }
    // }

    // Filter users based on search and filters
    const filteredUsers = data?.filter((user) => {
        const matchesSearch = 
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone.includes(searchQuery) ||
            user.location.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesRole = roleFilter === "all" || user.role === roleFilter
        const matchesGender = genderFilter === "all" || user.gender === genderFilter

        return matchesSearch && matchesRole && matchesGender
    }) || []

    // Calculate stats
    const totalUsers = data?.length || 0
    const adminCount = data?.filter(u => u.role === "Admin").length || 0
    const userCount = data?.filter(u => u.role === "User").length || 0

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>Loading users...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
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
                        Error Loading Users
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Failed to load users. Please try again.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalUsers}</div>
                            <p className="text-xs text-muted-foreground">
                                Registered accounts
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Administrators
                            </CardTitle>
                            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{adminCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Admin accounts
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Regular Users
                            </CardTitle>
                            <UserCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Standard accounts
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Table Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            User Management
                        </CardTitle>
                        <CardDescription>
                            View and manage all registered users in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Filters and Search */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, email, phone, or location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value)}>
                                <SelectTrigger className="text-black w-full sm:w-[150px]">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="User">Users</SelectItem>
                                    <SelectItem value="Admin">Admins</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={genderFilter} onValueChange={(value: any) => setGenderFilter(value)}>
                                <SelectTrigger className="text-black w-full sm:w-[150px]">
                                    <SelectValue placeholder="Filter by gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Genders</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Results count */}
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                                Showing {filteredUsers.length} of {totalUsers} users
                            </p>
                        </div>

                        {/* Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Search className="h-8 w-8 text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground">
                                                        No users found matching your criteria
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold">
                                                            {user.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground font-mono">
                                                            ID: {user._id.slice(-8)}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Mail className="h-3 w-3 text-muted-foreground" />
                                                            <span className="truncate max-w-[200px]" title={user.email}>
                                                                {user.email}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Phone className="h-3 w-3" />
                                                            <span>{user.phone}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MapPin className="h-3 w-3 text-muted-foreground" />
                                                        <span>{user.location}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {user.gender}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        variant={user.role === "Admin" ? "default" : "secondary"}
                                                        className="flex items-center gap-1 w-fit"
                                                    >
                                                        {user.role === "Admin" && (
                                                            <ShieldCheck className="h-3 w-3" />
                                                        )}
                                                        {user.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{formatDate(user.createdAt)}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        // onClick={() => handleDelete(user)}
                                                        // disabled={deleteMutation.isPending}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account for{" "}
                            <span className="font-semibold">{userToDelete?.name}</span> ({userToDelete?.email}) 
                            and remove their data from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel 
                        // disabled={deleteMutation.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            // onClick={confirmDelete}
                            // disabled={deleteMutation.isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {/* {deleteMutation.isPending ? "Deleting..." : "Delete User"} */}
                            Delete User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}