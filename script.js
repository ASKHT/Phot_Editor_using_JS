let chooseimage = document.querySelector(".choose_img input");
let uploadimg = document.querySelector(".choose_img img");
let chooseimgbutton = document.querySelector(".choose_img button");
let changeimage = document.querySelector(".viewimage img");
let filterbutton = document.querySelectorAll(".icons_room button");
let filtername = document.querySelector(".filterinfo .filtername");
let slider = document.querySelector(".slider input");
let slider_value = document.querySelector(".filterinfo .value");
let rotate_btns = document.querySelectorAll(".icons_room1 button");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save");

let brightness = 100;
let blur = 0;
let contrast = 100;
let invert = 0;
let saturate = 100;
let rotate = 0;
let flip_x = 1;
let flip_y = 1;
document.querySelector(".slider input");
// console.log(slider_value.value);
chooseimgbutton.addEventListener("click", () => {
  chooseimage.click();
});
// console.log(viewimage);
chooseimage.addEventListener("change", () => {
  let file = chooseimage.files[0];
  changeimage.src = URL.createObjectURL(file);
  changeimage.addEventListener("load", () => {
    document.querySelector(".wrapper").classList.remove("disabled");
  });
});
let check;
filterbutton.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
    filtername.innerText = element.id;
    if (element.id === "brightness") {
      slider.max = "200";
      slider.value = brightness;
      slider_value.innerText = `${brightness}`;
    } else if (element.id === "blur") {
      slider.value = blur;
      slider.max = "200";
      slider_value.innerText = `${blur}`;
    } else if (element.id === "contrast") {
      slider.value = contrast;
      slider.max = "200";
      slider_value.innerText = `${contrast}`;
    } else if (element.id === "invert") {
      slider.value = invert;
      slider.max = "100";
      slider_value.innerText = `${invert}`;
    } else if (element.id === "saturate") {
      slider.value = saturate;
      slider.max = "100";
      slider_value.innerText = `${saturate}`;
    }
  });
});

slider.addEventListener("input", () => {
  slider_value.innerText = `${slider.value}%`;
  let sliderstate = document.querySelector(".icons_room .active");
  if (sliderstate.id === "brightness") {
    brightness = slider.value;
  } else if (sliderstate.id === "contrast") {
    contrast = slider.value;
  } else if (sliderstate.id === "saturate") {
    saturate = slider.value;
  } else if (sliderstate.id === "invert") {
    invert = slider.value;
  } else if (sliderstate.id === "blur") {
    blur = slider.value;
  }
  changeimage.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
});
rotate_btns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id === "rotate_left") {
      rotate -= 90;
    } else if (element.id === "rotate_right") {
      rotate += 90;
    } else if (element.id === "flip_x") {
      flip_x = flip_x === 1 ? -1 : 1;
    } else if (element.id === "flip_y") {
      flip_y = flip_y === 1 ? -1 : 1;
    }

    changeimage.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  });
});

reset.addEventListener("click", () => {
  brightness = "100";
  saturate = "100";
  contrast = "100";
  invert = "0";
  blur = "0";
  rotate = 0;
  flip_x = 1;
  flip_y = 1;
  changeimage.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  changeimage.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
});

save.addEventListener("click", () => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = changeimage.naturalWidth;
  canvas.height = changeimage.naturalHeight;
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flip_x, flip_y);
  ctx.drawImage(
    changeimage,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
});
