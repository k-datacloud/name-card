import { gsap } from "gsap";
import { Curtains, Plane } from "curtainsjs";

const mainScript = () => {
  const squareContainer = document.querySelector(".square-container");
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
    const isMobile = window.innerWidth < 768;

    const duration = isMobile ? 0.1 : 0.001;
    const staggerEach = isMobile ? 0.01 : 0.004;
    const timeline = gsap.timeline();
    gsap.set(squares, { opacity: 1 });
    timeline
      .to(squareContainer, {
        backgroundColor: "transparent",
      })
      .to(squares, {
        opacity: 0,
        duration: duration,
        stagger: {
          each: staggerEach,
          from: "random",
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

  // window.addEventListener("DOMContentLoaded", () => {
  //   createSquares();
  //   pixelOut();
  // });

  // const initPixelTransition = () => {
  //   const flipBtn = document.querySelector(".js-link");
  //   if (!flipBtn) return;

  //   const pixelIn = () => {
  //     return new Promise((resolve) => {
  //       createSquares();
  //       gsap.fromTo(
  //         squares,
  //         { opacity: 0 },
  //         {
  //           opacity: 1,
  //           duration: 0.001,
  //           stagger: {
  //             each: 0.004,
  //             from: "random",
  //           },
  //           onComplete: resolve,
  //         }
  //       );
  //     });
  //   };

  //   const pixelOut = () => {
  //     gsap.to(squares, {
  //       opacity: 0,
  //       duration: 0.001,
  //       stagger: {
  //         each: 0.004,
  //         from: "random",
  //       },
  //       onComplete: () => {
  //         squareContainer.innerHTML = "";
  //         squares = [];
  //       },
  //     });
  //   };

  //   document.addEventListener("astro:before-swap", (event) => {
  //     event.preventDefault();
  //     window.alert("ページ遷移します");
  //     // pixelIn().then(() => {
  //     //   // pixelIn のアニメーションが終わったら遷移
  //     //   event.detail?.resolve?.();
  //     // });
  //   });

  //   document.addEventListener("astro:after-swap", (e) => {
  //     e.preventDefault();
  //     pixelOut();
  //   });
  // };

  // initPixelTransition();

  // document.addEventListener("astro:page-load", initPixelTransition);

  // const pixelIn = () => {
  //   console.log("pixelin");

  //   return new Promise((resolve) => {
  //     createSquares();
  //     gsap.fromTo(
  //       squares,
  //       { opacity: 0 },
  //       {
  //         opacity: 1,
  //         duration: 0.01,
  //         stagger: {
  //           each: 0.004,
  //           from: "random",
  //         },
  //         onComplete: resolve,
  //       }
  //     );
  //     console.log(document.querySelector(".square-container"));
  //   });
  // };

  // const pixelOut = () => {
  //   gsap.to(squares, {
  //     opacity: 0,
  //     duration: 0.01,
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

  // document.addEventListener("astro:before-preparation", (event) => {
  //   event.preventDefault();
  //   console.log("pixelin");
  //   pixelIn();
  // });

  // const flipBtn = document.querySelector(".js-link");
  // if (!flipBtn) return;
  // flipBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   pixelIn();
  // });

  const curtains = new Curtains({
    container: "canvas",
    watchScroll: false,
  });

  const planeEl = document.getElementById("profilePlane");

  // vertex shader（そのまま）
  const vertexShader = `
precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vUv;

void main() {
  vUv = aTextureCoord;
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
`;

  // fragment shader（uTimeなし）
  const fragmentShader = `
precision mediump float;

uniform sampler2D uSampler0;
uniform float uStrength;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  float wave = sin(uv.x * 12.0);
  float curve = smoothstep(0.0, 1.0, uv.x);

  uv.y += wave * curve * 0.06 * uStrength;

  gl_FragColor = texture2D(uSampler0, uv);
}

`;

  // Plane 作成
  const plane = new Plane(curtains, planeEl, {
    vertexShader,
    fragmentShader,
    uniforms: {
      uStrength: {
        name: "uStrength",
        type: "1f",
        value: 0,
      },
    },
  });

  // hover 状態
  plane.onReady(() => {
    plane.userData.hover = false;
    plane.userData.strength = 0; // 現在値
  });

  planeEl.addEventListener("mouseenter", () => {
    plane.userData.hover = true;
  });

  planeEl.addEventListener("mouseleave", () => {
    plane.userData.hover = false;
  });

  plane.onRender(() => {
    const target = plane.userData.hover ? 1 : 0;

    plane.userData.strength += (target - plane.userData.strength) * 0.08;

    plane.uniforms.uStrength.value = plane.userData.strength;
  });
};
export default mainScript;
