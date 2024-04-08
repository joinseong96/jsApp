const images = ["bg01.jpg", "bg02.jpg", "bg03.jpg", "bg05.jpg", "bg06.jpg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImageBox = document.querySelector(".img_wp");
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;

bgImageBox.appendChild(bgImage);