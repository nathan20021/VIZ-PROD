
const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}


export const rgbaToHex = (color) => {
    return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

export const rgbaToRgbaCSS = (rgba) => {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
}
