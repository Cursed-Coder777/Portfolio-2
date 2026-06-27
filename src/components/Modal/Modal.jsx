// Modal — info overlay triggered by clicking a 3D object.
//
// Flow:
//   1. A 3D mesh's onClick handler calls useModalStore.setModalID("some-id")
//      followed by openModal().
//   2. This component reads modalID and looks up content in modalContent.js.
//   3. Close via:
//      - Clicking the X button
//      - Pressing Escape
//      - Clicking outside the modal container
//   4. While open, cursor is forced to "auto" and scroll progress updates
//      are paused (checked in App.jsx's handleScroll).

import React, { useEffect, useRef } from "react";
import "./Modal.scss";
import { useModalStore } from "../../stores/useModalStore";
import { modalContent } from "../../data/modalContent";
import { playSound } from "../../utils/audioSystem.js";

const Modal = () => {
  const { isModalOpen, modalID, closeModal } = useModalStore();
  const modalRef = useRef(null);

  const handleClose = () => {
    playSound("thumpHover");
    closeModal();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen, closeModal]);

  // Close when clicking outside the modal container
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, closeModal]);

  // Force cursor to auto while modal is open (overrides any custom cursor)
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.cursor = "auto";
    }
  }, [isModalOpen]);

  if (!isModalOpen || !modalContent[modalID]) return null;

  const { title, link, linkText, paragraphs } = modalContent[modalID];

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <button className="modal-back-button" onClick={handleClose}>
          <svg
            width="20"
            height="20"
            class=""
            viewBox="0 0 130 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128.986 128.986L1 1" stroke="currentColor" />
            <path d="M128.986 128.986L1 1" stroke="currentColor" />
            <path d="M1 132.986L128.986 5" stroke="currentColor" />
          </svg>
        </button>

        <div className="modal-content">
          <h2 className="modal-title">{title}</h2>

          <div className="modal-paragraphs">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>
                {typeof paragraph === "string" ? (
                  paragraph
                ) : paragraph.disabled ? (
                  <>
                    <span className="modal-paragraph-disabled">
                      {paragraph.name}
                    </span>
                    {paragraph.text}
                  </>
                ) : (
                  <>
                    <a
                      href={paragraph.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {paragraph.name}
                    </a>
                    {paragraph.text}
                  </>
                )}
              </p>
            ))}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-link"
          >
            {linkText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
