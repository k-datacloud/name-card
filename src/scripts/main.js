import { gsap } from "gsap";

const mainScript = () => {
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

  const squareContainer = document.querySelector(".square-container");
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

  const pixelIn = () => {
    return new Promise((resolve) => {
      const isMobile = window.innerWidth < 768;

      const duration = isMobile ? 0.1 : 0.001;
      const staggerEach = isMobile ? 0.01 : 0.004;
      createSquares();
      gsap.fromTo(
        squares,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration,
          stagger: {
            each: staggerEach,
            from: "random",
          },
          onComplete: resolve,
        }
      );
    });
  };

  const pixelOut = () => {
    const isMobile = window.innerWidth < 768;

    const duration = isMobile ? 0.1 : 0.001;
    const staggerEach = isMobile ? 0.01 : 0.004;
    gsap.to(squares, {
      opacity: 0,
      duration: duration,
      delay: 0.7,
      stagger: {
        each: staggerEach,
        from: "random",
      },
      onComplete: () => {
        squareContainer.innerHTML = "";
        squares = [];
      },
    });
  };

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
    pixelOut();
  });

  // const pixelIn = () => {
  //   createSquares();
  //   gsap.fromTo(
  //     squares,
  //     { opacity: 0 },
  //     {
  //       opacity: 1,
  //       duration: 0.001,
  //       stagger: {
  //         each: 0.004,
  //         from: "random",
  //       },
  //     }
  //   );
  // };

  // const pixelOut = () => {
  //   gsap.to(squares, {
  //     opacity: 0,
  //     duration: 0.001,
  //     stagger: {
  //       each: 0.004,
  //       from: "random",
  //     },
  //     onComplete: () => {
  //       squareContainer.innerHTML = "";
  //       squares = [];
  //     },
  //   });
  // };

  // const initPixelTransition = () => {
  //   const flipBtn = document.querySelector(".js-link");
  //   if (!flipBtn) return;

  //   document.addEventListener("astro:before-swap", () => {
  //     pixelIn();
  //     console.log("fire");
  //   });

  //   document.addEventListener("astro:after-swap", () => {
  //     pixelOut();
  //   });
  // };

  // initPixelTransition();

  // document.addEventListener("astro:page-load", initPixelTransition);
};
export default mainScript;
