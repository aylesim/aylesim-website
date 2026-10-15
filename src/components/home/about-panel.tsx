"use client";

import { type ReactNode, useEffect, useId, useRef } from "react";

export function AboutPanel({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    const dismissBackdrop = (event: MouseEvent) => {
      if (event.target !== dialog) {
        return;
      }
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        dialog.close();
      }
    };
    dialog.addEventListener("click", dismissBackdrop);
    return () => dialog.removeEventListener("click", dismissBackdrop);
  }, []);

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="about-panel-trigger"
        onClick={() => dialogRef.current?.showModal()}
        type="button"
      >
        About my work
      </button>
      <dialog aria-labelledby={titleId} className="about-panel" ref={dialogRef}>
        <header className="about-panel-header">
          <h2 id={titleId}>About</h2>
          <form method="dialog">
            <button aria-label="Close about" type="submit">
              Close <span aria-hidden="true">×</span>
            </button>
          </form>
        </header>
        <div className="about-panel-copy">{children}</div>
      </dialog>
    </>
  );
}
