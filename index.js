const textElement = document.getElementById("text");
const hoursElement = document.getElementById("hour_hand");
const MinutesElement = document.getElementById("minute_hand");
const secondsElement = document.getElementById("second_hand");
const colorPickerElement = document.getElementById("colorPicker");

let showDate = true;

function animate() {
  const date = new Date();
  const hour = date.getHours() + date.getMinutes() / 60;
  const minute = date.getMinutes() + date.getSeconds() / 60;
  const second = date.getSeconds() + date.getMilliseconds() / 1000;
  const day = date.getDate();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  textElement.textContent = showDate ? day : ampm;

  hoursElement.setAttribute("transform", `rotate(${(360 / 12) * hour})`);
  MinutesElement.setAttribute("transform", `rotate(${(360 / 60) * minute})`);
  secondsElement.setAttribute("transform", `rotate(${(360 / 60) * second})`);

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

textElement.addEventListener("click", () => {
  showDate = !showDate;
});

colorPickerElement.addEventListener("input", updateColorScheme);

function updateColorScheme(event) {
  const newMainColor = event.target.value;

  document.documentElement.style.setProperty("--main-color", newMainColor);
  document.documentElement.style.setProperty(
    "--background-color",
    lightenDarkenColor(newMainColor, -20)
  );
  document.documentElement.style.setProperty(
    "--text-color-primary",
    lightenDarkenColor(newMainColor, 50)
  );
  document.documentElement.style.setProperty(
    "--text-color-secondary",
    lightenDarkenColor(newMainColor, 30)
  );
  document.documentElement.style.setProperty(
    "--accent-color",
    lightenDarkenColor(newMainColor, -40)
  );
}

function lightenDarkenColor(col, amt) {
  let usePound = false;

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
