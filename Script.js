import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    })
    gsap.ticker.lagSmoothing(0);

    initspotlightanimations();
    window.addEventListener("resize", initspotlightanimations);

    function initspotlightanimations() {
        const images = document.querySelectorAll("img")
        const coverImg = document.querySelector(".Spotlight-cover-img")
        const introHeader = document.querySelector(".Spotlight-intro-header")
        const outroHeader = document.querySelector(".Spotlight-outro-header")

        let introHeaderSplit = null
        let outroHeaderSplit = null

        introHeader = SplitText.create(introHeader, {type: "words"});
        gsap.set(introHeaderSplit.words, {opacity: 1})

        outroHeader = SplitText.create(outroHeader, {type: "words"})
        gsap.set(outroHeaderSplit.words, {opacity: 0})
        gsap.set(outroHeader, {opacity: 1}) 
    }

})