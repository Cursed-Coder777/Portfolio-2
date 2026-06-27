// Modal state (Zustand).
//
// Any 3D mesh can open a modal by calling:
//   useModalStore.getState().setModalID("some-key")
//   useModalStore.getState().openModal()
//
// The Modal component reads modalID to look up content from modalContent.js.
// Scroll progress is paused while isModalOpen is true (checked in App.jsx).

import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  modalID: "",

  setModalID: (id) =>
    set({
      modalID: id,
    }),

  openModal: () =>
    set({
      isModalOpen: true,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
    }),
}));
