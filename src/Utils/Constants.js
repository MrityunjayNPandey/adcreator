export const backgroundColors = [
  "#000",
  "#545454",
  "#737373",
  "#ff3131",
  "#ff5757",
  "#ff66c4",
  "#cb6ce6",
  "#8c52ff",
  "#0097b2",
  "#5ce1e6",
  "#5271ff",
  "#004aad",
  "#00bf63",
  "#7ed957",
];

export const textStyles = [
  {
    img: "assets/textStyles/bilbo-swash-caps.png",
    color: "#000",
    font: "Bilbo Swash Caps",
    val: "Congratulations",
  },
  {
    img: "assets/textStyles/rock-salt.png",
    color: "#000",
    font: "Rock Salt",
    val: "Adventure",
  },
  {
    img: "assets/textStyles/anton.png",
    color: "#000",
    font: "Anton",
    val: "SALE",
  },
  {
    img: "assets/textStyles/cinzel.png",
    color: "#000",
    font: "Cinzel",
    val: "FLAT 50%",
  },
  {
    img: "assets/textStyles/norican.png",
    color: "#C323A9",
    font: "Norican",
    val: "awesome",
  },
  {
    img: "assets/textStyles/condiment.png",
    color: "#F3C426",
    font: "Condiment",
    val: "Summer",
  },
  {
    img: "assets/textStyles/lily-script-one.png",
    color: "#FF3C93",
    font: "Lily Script One",
    val: "Candy",
  },
  {
    img: "assets/textStyles/monoton.png",
    color: "#D61939",
    font: "Monoton",
    val: "SALE",
  },
];

export const shapesList = [
  {
    name: "square",
    src: "assets/shapes/rectangle.svg",
    method: `context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(200, 0);
      context.lineTo(200, 200);
      context.lineTo(0, 200);
      context.closePath();
      context.fillStrokeShape(shape);`,
  },
  {
    name: "circle",
    src: "assets/shapes/circle.svg",
    method: `const x = 100;
    const y = 100;
    const radius = 100;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStrokeShape(shape);`,
  },
  {
    name: "triangle",
    src: "assets/shapes/triangle.svg",
    method: `const points = [0, 200, 100, 0, 200, 200];
    context.beginPath();
    context.moveTo(points[0], points[1]);
    context.lineTo(points[2], points[3]);
    context.lineTo(points[4], points[5]);
    context.closePath();
    context.fillStrokeShape(shape);`,
  },
  {
    name: "arrow",
    src: "assets/shapes/arrow.svg",
    method: `const arrowWidth = 100;
    const arrowHeight = 50;
    const triangleHeight = 40;
    context.beginPath();
    context.moveTo(0, 15);
    context.lineTo(arrowWidth, 15);
    context.lineTo(arrowWidth, 35);
    context.lineTo(0, 35);
    context.closePath();
    context.moveTo(arrowWidth, arrowHeight / 2);
    context.lineTo(arrowWidth + triangleHeight, arrowHeight / 2);
    context.lineTo(arrowWidth, 0);
    context.closePath();
    context.moveTo(arrowWidth, arrowHeight / 2);
    context.lineTo(arrowWidth + triangleHeight, arrowHeight / 2);
    context.lineTo(arrowWidth, 50);
    context.closePath();
    context.fillStrokeShape(shape);`,
  },
  {
    name: "pentagon",
    src: "assets/shapes/pentagon.svg",
    method: `context.beginPath();
    context.moveTo(100, 0);
    context.lineTo(200, 50);
    context.lineTo(160, 150);
    context.lineTo(40, 150);
    context.lineTo(0, 50);
    context.closePath();
    context.fillStrokeShape(shape);`,
  },
];

export const iconsList = [
  {
    name: "instagram",
    src: "assets/icons/instagram.png",
  },
  {
    name: "whatsapp",
    src: "assets/icons/whatsapp.png",
  },
  {
    name: "twitter",
    src: "assets/icons/twitter.png",
  },
  {
    name: "facebook",
    src: "assets/icons/facebook.png",
  },
  {
    name: "location",
    src: "assets/icons/location.png",
  },
  {
    name: "phone",
    src: "assets/icons/phone.png",
  },
  {
    name: "wallet",
    src: "assets/icons/wallet.png",
  },
  {
    name: "youtube",
    src: "assets/icons/youtube.png",
  },
  {
    name: "visa",
    src: "assets/icons/visa.png",
  },
  {
    name: "mastercard",
    src: "assets/icons/mastercard.png",
  },
  {
    name: "gift",
    src: "assets/icons/gift.png",
  },
  {
    name: "laptop",
    src: "assets/icons/laptop.png",
  },
];

export const templateList = [
  {
    src: "assets/templates/template1.jpg",
  },
  {
    src: "assets/templates/template2.jpg",
  },
  {
    src: "assets/templates/template3.png",
  },
  {
    src: "assets/templates/template4.png",
  },
];
