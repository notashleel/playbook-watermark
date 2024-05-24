const fetch = require("node-fetch");
const Canvas = require('canvas');
class Watermark {

    async put(water,bg)
    {
      const background = await Canvas.loadImage(bg);
      const watermark=await Canvas.loadImage(water);
      
      const canvas = await Canvas.createCanvas(background.width, background.height);
          const context = await canvas.getContext('2d');
      
      await context.drawImage(background, 0, 0, canvas.width, canvas.height);
      var cw=canvas.width;
      var ch=canvas.height;
      var ww=watermark.width;
      var wh=watermark.height;
      if(ww==wh)
      {
        if(cw>ch)
        {
          var theight=(canvas.width/watermark.width)*watermark.height;
          await context.drawImage(watermark, 0, 0, canvas.width, theight);
        }
        else if(cw<=ch)
        {
          var twidth=(canvas.height/watermark.height)*watermark.width;
          await context.drawImage(watermark, 0, 0, twidth, canvas.height);
        }
      }
      else if(cw==ch)
      {
        if(ww>wh)
        {
           var twidth=(canvas.height/watermark.height)*watermark.width;
          await context.drawImage(watermark, 0, 0, twidth, canvas.height);
        }
        else if(ww<=wh)
        {
           var theight=(canvas.width/watermark.width)*watermark.height;
          await context.drawImage(watermark, 0, 0, canvas.width, theight);
        }
      
      }
      else
      {
        if(cw>ch)
        {
          if(ww>wh)
          {
            var twidth=(canvas.height/watermark.height)*watermark.width;
          await context.drawImage(watermark, 0, 0, twidth, canvas.height);
          }
          else
          {
            var theight=(canvas.width/watermark.width)*watermark.height;
            await context.drawImage(watermark, 0, 0, canvas.width, theight);
          }
        }
        else
        {
          if(ww>wh)
          {
            var twidth=(canvas.height/watermark.height)*watermark.width;
            await context.drawImage(watermark, 0, 0, twidth, canvas.height);
            
          }
          else
          {
            var theight=(canvas.width/watermark.width)*watermark.height;
            await context.drawImage(watermark, 0, 0, canvas.width, theight);
          }
        }
        
        
      }
      
  
      
          return canvas.toBuffer();
        
    }

}
module.exports = Watermark