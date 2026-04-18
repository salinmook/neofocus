function spawnGoldConfetti(){
    const layer = document.querySelector(".confetti-layer");
    if (!layer) return;
    //for width phone wrapper
    const centerX = layer.clientWidth / 2;
    //height phone wrapper
    const bottomY = layer.clientHeight;
    for (let i = 0; i < 200; i++) {
        const el = document.createElement("div");
        //random size(confetti)
        const size = Math.random() * 8 + 8;
        el.style.position = "absolute";
        //begin spreading from mid-bottom
        el.style.left = centerX + "px";
        el.style.top = (bottomY - 10) + "px";
        //shape
        el.style.width = size + "px";
        el.style.height = size + "px";
        el.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
        el.style.background = "linear-gradient(45deg, #d4af37, #f5e6a3, #FFD700, #B8860B)";
        el.style.borderRadius = "1px";
        //spreading
        const angle = (Math.random() * Math.PI - Math.PI / 2) - (Math.PI / 4);
        //const angle = Math.random() * Math.PI - Math.PI / 2;
        const distance = Math.random() * 500 + 400;
        const x = Math.cos(angle) * distance;
        const y = -Math.abs(Math.sin(angle) * distance);
        el.style.setProperty("--x", x + "px");
        el.style.setProperty("--y", y + "px");
        //random speed
        const duration = Math.random() * 1.5 + 3;
        el.style.animation = `explode ${duration}s cubic-bezier(0.2, 0.8, 0.2 , 1) forwards`;
        layer.appendChild(el);
    }
}

//Calling method for confetti animation loading
document.addEventListener("DOMContentLoaded", () => {spawnGoldConfetti();
});