import config from '../config.json';
import express from 'express';
import debuginfo from '../debuginfo.json';
import path from 'path';
import fs from 'fs';

import generateAssets from './function/generateAssets';
import getDominantColor from './function/getDominantColor';
import isDarkColor from './function/isDarkColor';
import imgUrlToBuffer from './function/imgUrlToBuffer';
import imageType from './function/imageType';
import watermark from './function/watermark';
import uploadAssets from './function/uploadAssets';
import setsuccess from './function/setsuccess';

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../web'));
app.use(express.json());


app.get('/debug', (req, res) => {
  res.render('debug', { numberOfRequests: debuginfo.numberOfRequests, lastRequestDateAndTime: debuginfo.lastRequestDateAndTime })
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../web/index.html'))
});

app.post(config.endpoint, async (req, res) => {
  const {pluginInvocationToken, callbackUrl, assets} = req.body

  if (!pluginInvocationToken || !callbackUrl || !assets) {
    res.status(400).send('Missing required parameters');
    return;
  }
  
  const imageUrl = assets[0]['url']
  const uploadUrl = assets[0]['uploadUrl']

  await res.status(200).send()
  await generateAssets(pluginInvocationToken, callbackUrl, assets)

  let imageBuffer = await imgUrlToBuffer(imageUrl)
  const imageBase64 = imageBuffer.toString('base64')
  const imageExt = imageType(imageBase64)

  let dominantColorRGB =  await getDominantColor(imageUrl)
  let isDarkColorValue = await isDarkColor(dominantColorRGB)
  
  let watermarkBuffer = isDarkColorValue ? fs.readFileSync(path.join(__dirname, '../watermark/white.png')) : fs.readFileSync(path.join(__dirname, '../watermark/black.png'))

  let watermarked = await watermark(watermarkBuffer, imageBuffer)

  await uploadAssets(uploadUrl, watermarked, imageExt)

  await setsuccess(pluginInvocationToken, callbackUrl)

  debuginfo.numberOfRequests += 1
  debuginfo.lastRequestDateAndTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  fs.writeFileSync('./debuginfo.json', JSON.stringify(debuginfo, null, 2))


});

app.get('/confirmreset', (req, res) => {

  debuginfo.numberOfRequests = 0
  debuginfo.lastRequestDateAndTime = 'Unknown'
  
  fs.writeFileSync('./debuginfo.json', JSON.stringify(debuginfo, null, 2))

  res.redirect('/debug')
});



app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
});