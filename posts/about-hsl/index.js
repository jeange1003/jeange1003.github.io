import { HtmlSource } from "../../web-components/html-source.js";
import { define } from "../../web-components/define.js";

define(HtmlSource);

const hueSlider = document.getElementById("hue-slider");
const saturationSlider = document.getElementById("saturation-slider");
const lightnessSlider = document.getElementById("lightness-slider");
const selectedColor = document.getElementById("selected-color");

const color = {
  hue: 0,
  saturation: 100,
  lightness: 50,
};

let linearColors = [];
for (let i = 0; i < 360; i++) {
  linearColors.push(`hsl(${i}, 100%, 50%) ${(i / 360) * 100}%`);
}
hueSlider.style.backgroundImage = `linear-gradient(to right, ${linearColors.join(
  ","
)})`;

function updateColor() {
  const backgroundColor = `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
  selectedColor.style.backgroundColor = backgroundColor;
}
updateColor();

const updateSaturationSliderColor = () => {
  let linearColors = [];
  for (let i = 0; i < 100; i++) {
    linearColors.push(`hsl(${color.hue}, ${i}%, ${50}%) ${i}%`);
  }
  saturationSlider.style.backgroundImage = `linear-gradient(to right, ${linearColors.join(
    ","
  )})`;
};
updateSaturationSliderColor();

const updateLightnessSliderColor = () => {
  let linearColors = [];
  for (let i = 0; i < 100; i++) {
    linearColors.push(`hsl(${color.hue}, ${color.saturation}%, ${i}%) ${i}%`);
  }
  lightnessSlider.style.backgroundImage = `linear-gradient(to right, ${linearColors.join(
    ","
  )})`;
};
updateLightnessSliderColor();

const handleHueChange = (e) => {
  color.hue = e.target.value;
  updateColor();
  updateSaturationSliderColor();
  updateLightnessSliderColor();
};
hueSlider.addEventListener("pointerdown", (e) => {
  handleHueChange(e);
  hueSlider.addEventListener("pointermove", handleHueChange);
  hueSlider.addEventListener("pointerup", () => {
    hueSlider.removeEventListener("pointermove", handleHueChange);
  });
});

const handleSaturationChange = (e) => {
  color.saturation = e.target.value;
  updateColor();
  updateLightnessSliderColor();
};
saturationSlider.addEventListener("pointerdown", (e) => {
  handleSaturationChange(e);
  saturationSlider.addEventListener("pointermove", handleSaturationChange);
  saturationSlider.addEventListener("pointerup", () => {
    saturationSlider.removeEventListener("pointermove", handleSaturationChange);
  });
});

const handleLightnessChange = (e) => {
  color.lightness = e.target.value;
  updateColor();
};
lightnessSlider.addEventListener("pointerdown", (e) => {
  handleLightnessChange(e);
  lightnessSlider.addEventListener("pointermove", handleLightnessChange);
  lightnessSlider.addEventListener("pointerup", () => {
    lightnessSlider.removeEventListener("pointermove", handleLightnessChange);
  });
});
