const textElement = document.getElementById("text");
const hoursElement = document.getElementById("hour_hand");
const MinutesElement = document.getElementById("minute_hand");
const secondsElement = document.getElementById("second_hand");

let showDate = true;

function animate() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
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
