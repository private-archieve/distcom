import { ClientOnly } from './client'

// export function generateStaticParams() {
//     return [{ slug: ['/favicon.ico'] }]
// }

async function fetchRoutes() {
    return [
        '/',
        '/about',
        '/blog/first-post',
        '/products/electronics/phones',
        '/favicon.ico',
        // ...other routes
    ];
}

export async function generateStaticParams() {
    const routes = await fetchRoutes();

    return routes.map((route: string) => {
        // Split the route into segments, ignoring the leading '/'
        const segments = route.substring(1).split('/').filter(Boolean);
        return { slug: segments };
    });
}

export default function Page() {
    return <ClientOnly />
}