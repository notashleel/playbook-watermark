export default async (imgUrl: string) => {
    let fetchedImage = await fetch(imgUrl)
    let arrayBuffer = await fetchedImage.arrayBuffer()
    return await Buffer.from(arrayBuffer)
}