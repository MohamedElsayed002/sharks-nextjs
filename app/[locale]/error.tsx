"use client"

import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string};
    reset: () => void
}) {

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">{error.message}</h1>
            <div className="mt-12 flex justify-center">
                <Button onClick={() => reset()}>Try again</Button>
            </div>
        </main>
    )
}