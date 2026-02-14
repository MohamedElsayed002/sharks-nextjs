import { LeftDesign } from "@/components/auth-layout/left-layout"
import { AuthRedirectGuard } from "@/components/auth/AuthRedirectGuard"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthRedirectGuard>
      <div className="h-screen overflow-hidden bg-[#F9F8F4]">
        <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
          {/* Left: value prop */}
          <div className="relative hidden h-full min-h-0 w-full overflow-hidden md:flex md:items-center md:justify-center md:bg-gradient-to-br md:from-[#F9F8F4] md:via-[#F5F3ED] md:to-[#F9F8F4] md:p-10">
            <LeftDesign />
          </div>

          {/* Vertical line separator – 1px, hidden on mobile */}
          <div className="hidden h-full w-px shrink-0 bg-slate-200 md:block" aria-hidden />

          {/* Right: form */}
          <main className="relative flex h-full min-h-0 items-center justify-center overflow-hidden p-4 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-[#C9A227]/[0.03] via-transparent to-transparent" aria-hidden />
            <div className="relative w-full max-w-md">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthRedirectGuard>
  )
}

export default AuthLayout
