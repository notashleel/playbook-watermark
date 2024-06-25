import axios from "axios";
export default async function (pluginInvocationToken: string, callbackUrl: string, assets: any[]) {
    await axios.post(callbackUrl, {
        pluginInvocationToken,
        operation: 'createAssets',
        assets: [{
            title: `${assets[0]['title']} (Watermarked)`
        }]
    })
}