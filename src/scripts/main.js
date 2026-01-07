import { gsap } from "gsap";

const mainScript = () => {
  // modal

  const modal = document.querySelector(".js-modal");
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
export default mainScript;
