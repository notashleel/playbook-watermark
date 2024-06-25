import Canvas from "canvas";
export default async function(watermark:Buffer, background:Buffer) : Promise<Buffer> {
    const canvasBackground = await Canvas.loadImage(background);
    const canvasWatermark = await Canvas.loadImage(watermark);
    const canvas = Canvas.createCanvas(canvasBackground.width, canvasBackground.height);
    const ctx = canvas.getContext('2d');
    await ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);
    
    let canvasWidth : number = canvas.width;
    let canvasHeight : number = canvas.height;
    let watermarkWidth : number = canvasWatermark.width;
    let watermarkHeight : number = canvasWatermark.height;

    if (watermarkWidth==watermarkHeight) {
        if (canvasWidth>canvasHeight) {
            await ctx.drawImage(canvasWatermark, 0, 0, canvasWidth, watermarkHeight * (canvasWidth/watermarkWidth));
        }
        else {
            await ctx.drawImage(canvasWatermark, 0, 0, watermarkWidth * (canvasHeight/watermarkHeight), canvasHeight);
        }
    }

    else if (canvasWidth==canvasHeight) {
        if (watermarkWidth>watermarkHeight) {
            await ctx.drawImage(canvasWatermark, 0, 0, watermarkWidth * (canvasWidth/watermarkHeight), canvasHeight);
        }
        else {
            await ctx.drawImage(canvasWatermark, 0, 0, canvasWidth, watermarkHeight * (canvasWidth/watermarkWidth));
        }
    }

    else {
        if(canvasWidth>canvasHeight) {
          if(watermarkWidth>watermarkHeight) {
            await ctx.drawImage(canvasWatermark, 0, 0, watermarkWidth * (canvasHeight/watermarkHeight), canvasHeight);
          }
          else
          {
            await ctx.drawImage(canvasWatermark, 0, 0, canvasWidth, watermarkHeight * (canvasWidth/watermarkWidth));
          }
        }
        else {
          if(watermarkWidth>watermarkHeight) {
            await ctx.drawImage(canvasWatermark, 0, 0, watermarkWidth * (canvasHeight/watermarkHeight), canvasHeight);
          }
          else
          {
            await ctx.drawImage(canvasWatermark, 0, 0, canvasWidth, watermarkHeight * (canvasWidth/watermarkWidth));
          }
        }
    }

    return canvas.toBuffer();

}