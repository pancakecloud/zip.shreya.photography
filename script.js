const horizontal = document.getElementById("horizontal");
  const scrollContainer = document.querySelector(".scroll-container");
  const grid = document.getElementById("imageGrid");

  const TOTAL_IMAGES = 40;

  // Create images automatically
for (let i = 1; i <= TOTAL_IMAGES; i++) {
  const img = document.createElement("img");

  img.src = `images/${i}.jpg`;
  img.decoding = "async"; // safe to keep

  img.onload = () => {
    if (img.naturalHeight > img.naturalWidth) {
      img.className = "v";
    } else {
      img.className = "h";
    }
  };

  grid.appendChild(img);
}


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

  window.addEventListener("scroll", updateScroll);
  window.addEventListener("resize", () => location.reload());

  const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

// Click any image to open
document.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.closest(".grid")) {
    lightboxImg.src = e.target.src;
    lightbox.classList.add("active");
  }
});

// Click anywhere to close
lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
});

document.body.style.overflow = "hidden";
document.body.style.overflow = "";

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("active");
  }
});

if (window.innerWidth > 768) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    horizontal.style.transform = `translateX(-${scrollY}px)`;
  });
}
