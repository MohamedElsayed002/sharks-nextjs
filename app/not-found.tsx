import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <html>
            <body>
                <main className="grid min-h-screen place-items-center items-center">
                    {/* Message */}
                    <h1 className="text-4xl font-bold text-red-500">
                        This page was not found 😔
                    </h1>

                    {/* Homepage link */}
                    <Button className=" mt-5" variant="destructive" asChild>
                        <Link href="/"> Go back to Homepage</Link>
                    </Button>
                </main>
            </body>
        </html>
    )
}