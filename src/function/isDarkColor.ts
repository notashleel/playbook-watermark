export default async function ([r,g,b] : number[]) : Promise<boolean> {

    let colorArray = [r / 255, g / 255, b / 255].map(function (v) {
    if (v <= 0.03928) {
      return v / 12.92;
    }

    return Math.pow((v + 0.055) / 1.055, 2.4);
  });

  let luminance = 0.2126 * colorArray[0] + 0.7152 * colorArray[1] + 0.0722 * colorArray[2];

  return luminance <= 0.179;
}