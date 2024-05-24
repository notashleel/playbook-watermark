require('dotenv').config()
const fs = require('fs')
const axios = require('axios')
var http = require('http');
const canvas = require('canvas')

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const path = require('path')



app.get('/playbookapi', async (req, res) => {
    console.log('Received GET');
    console.log(req.body);
    res.send('Hello World! Use POST to trigger the plugin in development.');
  });

app.post('/playbookapi', async (req, res) => {
    const {pluginInvocationToken, operationName, callbackUrl, assets} = req.body
    res.status(200).send()
    const upload_asset = await axios.post(callbackUrl, {
        pluginInvocationToken,
        operation: "createAssets",
        assets: [{
            title: `${assets[0]["title"]} - Watermarked`
        }]
    })
    const gray_watermark_buffer = fs.readFileSync('./playbook/gray.png')
    const {Watermark} = require('./playbook/index.js')
    const watermark = new Watermark()
    var buffer = ""
    const response = await fetch(assets[0]['url']);
    const arrayBuffer = await response.arrayBuffer();
    var buffer = await Buffer.from(arrayBuffer);
    var buffer_base64 = buffer.toString('base64')
    const imageIsJpeg = await buffer_base64.startsWith("/")
    const imageIsPng = await buffer_base64.startsWith("i")
    const imageIsWebp = await buffer_base64.startsWith("U")
    const imageIsSvg = await buffer_base64.startsWith("P")
    if (imageIsJpeg == false && imageIsPng == false && imageIsWebp == false && imageIsSvg == false){
     axios.post(callbackUrl, {
        pluginInvocationToken,
        "operation": "setStatus",
        "status": "failed"
      })
    }
    else {        
       const sharp = require('sharp')
       var buffer2 = await sharp(buffer).png().toBuffer();
       var watah = await watermark.put(gray_watermark_buffer, buffer2)
       const base64 = await watah.toString('base64')
       let base64Image = base64.split(';base64,').pop();
    axios.put(upload_asset.data.assets[0].uploadUrl, Buffer.from(base64Image, 'base64'), {
        headers: {
        'Content-Type': 'image/png'
        }
      }
    )
    axios.post(callbackUrl, {
        pluginInvocationToken,
        "operation": "setStatus",
        "status": "success"
      })
    }
});


var httpServer = http.createServer(app);

httpServer.listen(80, () => {
  console.log('HTTP server running on port 80')
});