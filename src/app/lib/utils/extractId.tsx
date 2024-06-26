export default function extractId(url: string) {
    const segments = url.split('/');
    return segments.pop();
}
