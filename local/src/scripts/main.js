// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
//
// // Регистрируем плагины
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
// // Создаем плавный скролл
// ScrollSmoother.create({
//   wrapper: "#smooth-wrapper",
//   content: "#smooth-content",
//   smooth: 1.2, // скорость скролла
//   effects: true, // включаем data-speed и data-lag эффекты
// });
//
// // Горизонтальный скролл для слайдера
// if (document.getElementById("slider-1")) {
//   const horizontalSection = document.querySelector("#slider-1");
//   const pinWrap = horizontalSection.querySelector(".slider__items");
//   const container = horizontalSection.querySelector(".container");
//
//   let pinWrapWidth;
//   let horizontalScrollLength;
//
//   function refresh() {
//     pinWrapWidth = pinWrap.scrollWidth;
//     horizontalScrollLength = pinWrapWidth - container.offsetWidth;
//   }
//
//   refresh();
//
//   gsap.to(pinWrap, {
//     scrollTrigger: {
//       scrub: true,
//       trigger: horizontalSection,
//       pin: horizontalSection,
//       start: "center center",
//       end: () => `+=${pinWrapWidth}`,
//       invalidateOnRefresh: true
//     },
//     x: () => -horizontalScrollLength,
//     ease: "none"
//   });
//
//   ScrollTrigger.addEventListener("refreshInit", refresh);
// }

// Liquid Glass эффект по кнопке "Дропнуть басс"
import LiquidBackground from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js";

const dropBassBtn = document.getElementById("drop-bass-btn");
const liquidCanvas = document.getElementById("liquid-canvas");

let liquidApp = null;
let isActive = false;
let isFading = false;

const closeOverlay = document.createElement("div");
closeOverlay.id = "liquid-close-overlay";
document.body.appendChild(closeOverlay);

function activateLiquid() {
  if (isFading) return;

  liquidCanvas.classList.add("liquid-canvas--active");
  closeOverlay.classList.add("liquid-close-overlay--active");
  isActive = true;

  if (!liquidApp) {
    liquidApp = LiquidBackground(liquidCanvas);
    liquidApp.liquidPlane.material.metalness = 0.75;
    liquidApp.liquidPlane.material.roughness = 0.25;
    liquidApp.liquidPlane.uniforms.displacementScale.value = 5;
    liquidApp.setRain(false);
  }
}

function deactivateLiquid() {
  if (isFading) return;

  closeOverlay.classList.remove("liquid-close-overlay--active");
  liquidCanvas.classList.remove("liquid-canvas--active");
  isActive = false;
  isFading = true;

  liquidCanvas.addEventListener(
    "transitionend",
    () => {
      isFading = false;
      if (!isActive && liquidApp && liquidApp.dispose) {
        liquidApp.dispose();
        liquidApp = null;
      }
    },
    { once: true },
  );
}

if (dropBassBtn) {
  dropBassBtn.addEventListener("click", () => {
    if (isActive) {
      deactivateLiquid();
    } else {
      activateLiquid();
    }
  });
}

closeOverlay.addEventListener("click", () => {
  if (isActive) {
    deactivateLiquid();
  }
});
