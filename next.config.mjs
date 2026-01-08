/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**', // Autorise tous les chemins pour ce domaine
            },
        ],
    },
};

export default nextConfig;