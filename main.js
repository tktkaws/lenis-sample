import "./style.css";

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const easeOutQuart = (x) => {
  return 1 - Math.pow(1 - x, 4);
};

const lenis = new Lenis({
  lerp: 0.2, // 慣性の強さ
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

const test = document.querySelector(".test");
gsap.to(test, {
  scrollTrigger: test,
  x: 500,
  start: "top top", // when the top of the trigger hits the top of the viewport
  end: "+=500", // end after scrolling 500px beyond the start
  scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

// アンカーリンクを取得
const anchor = document.querySelector(".js-anchor");
// クリック時に目的の箇所までスクロールする
anchor.addEventListener("click", (e) => {
  // urlを変更しないようにする
  e.preventDefault();
  // スクロール
  lenis.scrollTo("#animation");
});

const model = document.querySelector(".test");
console.log(model);
// // スクロールの強さに応じてモデルを回転させる
// model.rotation.y += 0.01 + Math.abs(lenis.velocity * 0.005);
// // lenis.velocityをコンソールログで表示
// Math.abs(lenis.velocity) > 0.01 && console.log(lenis.velocity);

requestAnimationFrame(raf);
