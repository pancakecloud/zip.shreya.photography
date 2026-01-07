const loader = document.getElementById("loader");
const horizontal = document.getElementById("horizontal");
const scrollContainer = document.querySelector(".scroll-container");
const grid = document.getElementById("imageGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const TOTAL_IMAGES = 40;
let loadedImages = 0;

// 🔒 Lock scroll initially
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";

// ----------------------------
// CREATE IMAGES + TRACK LOAD
// ----------------------------
for (let i = 1; i <= TOTAL_IMAGES; i++) {
  const img = document.createElement("img");
  img.src = `images/${i}.jpg`;
  img.decoding = "async";

  img.onload = () => {
    loadedImages++;

    if (img.naturalHeight > img.naturalWidth) {
      img.classList.add("v");
    } else {
      img.classList.add("h");
    }

    // ✅ When ALL images are loaded
    if (loadedImages === TOTAL_IMAGES) {
      setTimeout(() => {
        loader.classList.add("hidden");

        // 🔓 Restore scroll
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      }, 400);
    }
  };

  img.onerror = () => {
    loadedImages++;
  };

  grid.appendChild(img);
}

// ----------------------------
// HORIZONTAL SCROLL LOGIC
// ----------------------------
function updateScroll() {
  const totalScroll =
    horizontal.scrollWidth - window.innerWidth;

  const scrollTop = window.scrollY;
  const scrollHeight =
    scrollContainer.offsetHeight - window.innerHeight;

  const progress = scrollTop / scrollHeight;
  const translateX = -totalScroll * progress;

  horizontal.style.transform = `translateX(${translateX}px)`;
}

if (window.innerWidth > 768) {
  window.addEventListener("scroll", updateScroll);
}

// ----------------------------
// LIGHTBOX
// ----------------------------
document.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.closest(".grid")) {
    lightboxImg.src = e.target.src;
    lightbox.classList.add("active");
  }
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("active");
  }
});

// ----------------------------
// RESIZE
// ----------------------------
window.addEventListener("resize", () => location.reload());
