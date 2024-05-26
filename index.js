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
const { array } = require('i/lib/util.js');

async function getDominantColor(imageObject) {
  const ColorThief = require('colorthief');
  const color = await ColorThief.getColor(imageObject);
  return color;
}

async function isDarkColor(hexColor) {
  r = hexColor[0];
  g = hexColor[1];
  b = hexColor[2];

  var colorArray = [r / 255, g / 255, b / 255].map(function (v) {
    if (v <= 0.03928) {
      return v / 12.92;
    }

    return Math.pow((v + 0.055) / 1.055, 2.4);
  });

  var luminance = 0.2126 * colorArray[0] + 0.7152 * colorArray[1] + 0.0722 * colorArray[2];

  return luminance <= 0.179;
};




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
    const black_watermark = fs.readFileSync('./playbook/black.png')
    const white_watermark = fs.readFileSync('./playbook/white.png')
    const {Watermark} = require('./playbook/index.js')
    const watermark = new Watermark()
    var buffer = ""
    const response = await fetch(assets[0]['url']);
    const arrayBuffer = await response.arrayBuffer();
    var buffer = await Buffer.from(arrayBuffer);
    var buffer_base64 = buffer.toString('base64')
    var rgb = await getDominantColor(assets[0]['url'])
    var is_dark = await isDarkColor(rgb)
    var is_dark = await isDarkColor(rgb)
    if (is_dark == true){
      var watermark_buffer = white_watermark
    }
    else {
      var watermark_buffer = black_watermark
    }
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
       var watah = await watermark.put(watermark_buffer, buffer2)
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