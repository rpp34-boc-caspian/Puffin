export const cleanData = (hex: string) => {
  hex = hex.slice(1);
  var aRgbHex: any = hex.match(/.{1,2}/g);
  var aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16)
  ];
  return aRgb;
};