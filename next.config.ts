import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        domains: ['x00zgx6o26.ufs.sh', 'utfs.io', 'oaidalleapiprodscus.blob.core.windows.net']

    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);