import { useEffect, useRef, useState } from "react";
import type { Props } from "../../types/steps/steps.types";

export default function OnboardingModal({
  steps,
  isOpen: controlledOpen,
  onClose,
  startIndex = 0,
  closeOnOverlayClick = false,
}: Props) {
  const [open, setOpen] = useState<boolean>(!!controlledOpen);
  const [index, setIndex] = useState<number>(startIndex);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [highlightRect, setHighlightRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (typeof controlledOpen === "boolean") setOpen(controlledOpen);
  }, [controlledOpen]);

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        const focusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
      setHighlightRect(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setHighlightRect(null);
    const step = steps[index];
    if (step?.selector) {
      const el = document.querySelector(step.selector) as HTMLElement | null;
      if (el) {
        const rect = el.getBoundingClientRect();
        setHighlightRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    const onResize = () => {
      const step2 = steps[index];
      if (step2?.selector) {
        const el2 = document.querySelector(step2.selector) as HTMLElement | null;
        if (el2) {
          const r = el2.getBoundingClientRect();
          setHighlightRect({
            top: r.top + window.scrollY,
            left: r.left + window.scrollX,
            width: r.width,
            height: r.height,
          });
        }
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, open, steps]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, index]);

  const openModal = (from = 0) => {
    setIndex(from);
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    onClose?.();
  };

  const next = () => {
    if (index + 1 < steps.length) setIndex(i => i + 1);
    else close();
  };
  const prev = () => {
    if (index > 0) setIndex(i => i - 1);
  };
  const goTo = (i: number) => {
    if (i >= 0 && i < steps.length) setIndex(i);
  };

  const progress = Math.round(((index + 1) / steps.length) * 100);

  if (!open) {
    return (
      <div>
        <button
          className="px-4 py-2 m-6 bg-accent text-white rounded"
          onClick={() => openModal(0)}
        >
          Launch onboarding
        </button>
      </div>
    );
  }

  const step = steps[index];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center"
        aria-hidden="true"
        onMouseDown={(e) => {
          if (closeOnOverlayClick && e.target === e.currentTarget) close();
        }}
      />

      {highlightRect && (
        <div
          className="pointer-events-none fixed z-50 rounded-md"
          style={{
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.9)",
            borderRadius: 8,
            transition: "all 200ms ease",
          }}
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-label={step.title ?? "Onboarding"}
        ref={modalRef}
        className="fixed z-50 max-w-4xl w-[90%] md:w-3/4 bg-white rounded-2xl shadow-2xl p-6 text-gray-900"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">{step.title ?? `Шаг ${index + 1}`}</h3>
            <div className="text-sm text-gray-500">Step {index + 1} of {steps.length}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500 mr-4 hidden md:block">{progress}%</div>
            <button
              aria-label="Закрыть"
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={close}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full my-4">
          <div
            className="h-2 rounded-full"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg,#ec4899,#b73676)" }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {step.image ? (
            <div className="md:col-span-1 flex items-center justify-center">
              <img src={step.image} alt="" className="max-h-48 object-contain rounded" />
            </div>
          ) : null}

          <div className="md:col-span-2">
            <div className="prose max-w-none text-gray-700">
              {step.content}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="px-3 py-2 rounded border disabled:opacity-50 cursor-pointer hover:bg-black/20"
            >
              ← Cancel
            </button>

            <button
              onClick={() => {
                goTo(0);
              }}
              className="px-3 py-2 rounded border cursor-pointer hover:bg-black/20"
            >
              Start
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Перейти к шагу ${i + 1}`}
                  className={`w-2 h-2 rounded-full cursor-pointer ${i === index ? "bg-accent" : "bg-gray-300"}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="px-4 py-2 bg-accent hover:bg-accent-hover
              text-white rounded cursor-pointer"
            >
              {index === steps.length - 1 ? "Complete" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
