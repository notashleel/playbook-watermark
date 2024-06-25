export default function(base64: string) : string {
    if (base64.startsWith("/")) {
        return 'jpeg'
    }
    else if (base64.startsWith("i")) {
        return 'png'
    }
    else if (base64.startsWith("U")) {
        return 'webp'
    }
    else if (base64.startsWith("P")) {
        return 'svg'
    }
    return 'other'
}