import { LeftDesign } from "@/components/auth-layout/left-layout";
import { AuthRedirectGuard } from "@/components/auth/AuthRedirectGuard";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthRedirectGuard>
      <div className="h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden h-full w-full md:flex items-center justify-center">
          <LeftDesign/>
        </div>

        <main className="h-full">
          {children}
        </main>
      </div>
    </AuthRedirectGuard>
  );
};

export default AuthLayout;
