import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
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

    function generateScatterDirections(count = 20) {
        const directions = new Set();

        while (directions.size < count) {
            // valores aleatorios entre -2.0 y 2.0 con dos decimales
            const x = parseFloat((Math.random() * 4 - 2).toFixed(2));
            const y = parseFloat((Math.random() * 4 - 2).toFixed(2));

            // evitar (0,0) porque sería dirección nula
            if (x === 0 && y === 0) continue;

            // usamos string como clave para evitar duplicados
            directions.add(`${x},${y}`);
        }

        // convertimos el Set a array de objetos
        return Array.from(directions).map(str => {
            const [x, y] = str.split(",").map(Number);
            return { x, y };
        });
    }

    function initspotlightanimations() {
        const images = document.querySelectorAll("img")
        const coverImg = document.querySelector(".Spotlight-cover-img")
        const introHeader = document.querySelector(".Spotlight-intro-header")
        const outroHeader = document.querySelector(".Spotlight-outro-header")

        let introHeaderSplit = null
        let outroHeaderSplit = null

        introHeaderSplit = SplitText.create(introHeader, {type: "words"})
        gsap.set(introHeaderSplit.words, {opacity: 1})

        outroHeaderSplit = SplitText.create(outroHeader, {type: "words"})
        gsap.set(outroHeaderSplit.words, {opacity: 0})
        gsap.set(outroHeader, {opacity: 1})

        const scatterDirections = generateScatterDirections();

        const screenWidth = window.innerWidth;
        const screenheight = window.innerHeight;
        const isMobile = screenWidth < 1000;
        const scatterMultiplier = isMobile ? 2.5 : 0.5;


        const startPositions = Array.from(images).map(() => ({
            x: 0,
            y: 0,
            z: -1000,
            scale: 0,
        }))

        const endPositions = scatterDirections.map((dir) => ({
            x: dir.x * screenWidth * scatterMultiplier,
            y: dir.y * screenheight * scatterMultiplier,
            z: 2000,
            scale: 1,
        }))


        images.forEach((img, index) => {
            gsap.set(img, startPositions[index])
        })


        gsap.set(coverImg, {
            z: -1000,
            scale: 0,
            x: 0,
            y: 0,
        })

    }

})