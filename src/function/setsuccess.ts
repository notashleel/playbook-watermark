import axios from "axios"
export default async function(pluginInvocationToken: string, callbackUrl: string) {
    await axios.post(callbackUrl, {
        pluginInvocationToken,
        "operation": "setStatus",
        "status": "success"
    })
}