import colortheif from 'colorthief';
export default async function (imageUrl: string) : Promise<number[]> {
    return await colortheif.getColor(imageUrl);
}