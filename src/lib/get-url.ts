export function getUrl(path?: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calm-smoke-03f15421e.5.azurestaticapps.net/'
    //.... mexer aqui caso de bug na redirecionaçao do site
    const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path || ''
    return `${baseUrl}${normalizedPath}`
}