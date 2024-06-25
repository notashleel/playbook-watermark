import axios from "axios";
export default async function (uploadUrl: string, assets: Buffer, imageExt: string) {
    await axios.put(uploadUrl, assets, {
        headers: {
            'Content-Type': 'image/' + imageExt,
        }
    }
    )
}