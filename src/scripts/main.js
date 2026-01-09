import { gsap } from "gsap";
import { Curtains, Plane } from "curtainsjs";

const mainScript = () => {
  const squareContainer = document.querySelector(".square-container");
  const loadingText = document.querySelector(".loading-text");
  const loadingTextSplit = () => {
    const messages = ["fetching..", "processing..", "starting..", "oooooo.."];
    const letter = messages[Math.floor(Math.random() * messages.length)];
    const words = letter.trim().split("");
    loadingText.innerHTML = "";
    words.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.classList.add("loading-text__char");
      loadingText.appendChild(span);
    });
  };
  loadingTextSplit();

  gsap.set(squareContainer, {
    backgroundColor: "#080807",
  });
  let squares = [];
  const mm = gsap.matchMedia();

  const createSquares = () => {
    let squareSize = 80;
    mm.add("(min-width: 1024px)", () => {
      squareSize = 80;
    });
    mm.add("(max-width: 1023px)", () => {
      squareSize = 60;
    });
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const numCols = Math.ceil(screenWidth / squareSize);
    const numRows = Math.ceil(screenHeight / squareSize);
    const numSquares = numCols * numRows;

    squareContainer.innerHTML = "";
    if (loadingText) {
      squareContainer.appendChild(loadingText);
      const span = document.createElement("span");
    }
    squares = [];

    squareContainer.style.width = `${numCols * squareSize}px`;
    squareContainer.style.height = `${numRows * squareSize}px`;

    for (let i = 0; i < numSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      squareContainer.appendChild(square);
      squares.push(square);
    }
  };
  createSquares();
  // modal
  const modalInit = () => {
    const modal = document.querySelector(".js-modal");
    if (!modal) return;
    const modalWrapper = modal.querySelector(".modal__wrapper");
    const modalMain = modal.querySelector(".modal__main");
    const openModal = document.querySelector(".js-modal-open");
    const closeModal = modal.querySelector(".js-modal-close");

    gsap.set(modal, {
      opacity: 0,
      pointerEvents: "none",
      zIndex: -1,
    });

    const open = () => {
      gsap.to(modal, {
        opacity: 1,
        pointerEvents: "auto",
        zIndex: 9999,
      });
    };

    const close = () => {
      gsap.to(modal, {
        opacity: 0,
        pointerEvents: "none",
        zIndex: -1,
      });
    };

    openModal.addEventListener("click", open);
    closeModal.addEventListener("click", close);
    modalWrapper.addEventListener("click", close);
    modalMain.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  };

  modalInit();
  document.addEventListener("astro:page-load", modalInit);

  const pixelIn = () => {
    return new Promise((resolve) => {
      const isMobile = window.innerWidth < 768;

      const duration = isMobile ? 0.1 : 0.001;
      const staggerEach = isMobile ? 0.01 : 0.004;
      createSquares();
      const timeline = gsap.timeline();
      gsap.set(squares, { opacity: 0 });
      timeline
        .to(squareContainer, {
          backgroundColor: "transparent",
        })
        .to(squares, {
          opacity: 1,
          duration: duration,
          stagger: {
            each: staggerEach,
            from: "random",
          },
        })
        .call(() => {
          resolve();
        });
    });
  };

  const pixelOut = () => {
    const loadingTextLetter = document.querySelectorAll(".loading-text span");
    const isMobile = window.innerWidth < 768;

    const pixelDuration = isMobile ? 0.1 : 0.001;
    const pixelStaggerEach = isMobile ? 0.01 : 0.004;
    const timeline = gsap.timeline();
    gsap.set(squares, { opacity: 1 });
    gsap.set(loadingTextLetter, {
      yPercent: 100,
      opacity: 0,
    });
    timeline
      .to(loadingTextLetter, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          each: 0.1,
        },
      })
      .to(
        {},
        {
          duration: 1,
        }
      )
      .to(loadingTextLetter, {
        yPercent: -100,
        opacity: 0,
        duration: 0.7,
        ease: "power2.in",
      })
      .to(squareContainer, {
        backgroundColor: "transparent",
      })
      .to(squares, {
        opacity: 0,
        duration: pixelDuration,
        stagger: {
          each: pixelStaggerEach,
          from: "random",
        },
      });
  };

  const loadingTextAnimation = () => {};

  loadingTextAnimation();

  const flipBtn = document.querySelector(".js-link");
  if (!flipBtn) return;

  flipBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const to = e.currentTarget.dataset.to;

    pixelIn().then(() => {
      window.location.href = to;
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    createSquares();
    loadingTextAnimation();
    pixelOut();
  });
};
export default mainScript;
