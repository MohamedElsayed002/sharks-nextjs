import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "x00zgx6o26.ufs.sh", pathname: "/**" },
            { protocol: "https", hostname: "utfs.io", pathname: "/**" },
            // { protocol: "https", hostname: "oaidalleapiprodscus.blob.core.windows.net", pathname: "/**" },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);