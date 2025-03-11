import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";
import { createRoot, Root } from "react-dom/client";

export type ToastProps = {
  title: string;
  description: string;
  type: "success" | "error";
};

let toastRoot: Root | null = null;

export const Toast = ({ title, description, type }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (toastRoot) {
        toastRoot.unmount();
        toastRoot = null;
        const container = document.getElementById("toast-container");
        if (container) document.body.removeChild(container);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 flex w-[350px] items-start gap-4 rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out
        ${type === "success" ? "bg-green-50" : "bg-red-50"}`}
      role="alert"
    >
      <div className="mt-1">
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
      </div>
      <div className="flex-1">
        <h3
          className={`font-medium ${
            type === "success" ? "text-green-800" : "text-red-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 text-sm ${
            type === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {description}
        </p>
      </div>
      <button
        onClick={() => {
          if (toastRoot) {
            toastRoot.unmount();
            toastRoot = null;
            const container = document.getElementById("toast-container");
            if (container) document.body.removeChild(container);
          }
        }}
        className={`shrink-0 rounded-lg p-1 transition-colors duration-200
          ${
            type === "success"
              ? "hover:bg-green-100 text-green-600"
              : "hover:bg-red-100 text-red-600"
          }`}
      >
        <span className="sr-only">Close</span>
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );
};

export const showToast = (props: ToastProps) => {
  if (toastRoot) {
    toastRoot.unmount();
    toastRoot = null;
    const oldContainer = document.getElementById("toast-container");
    if (oldContainer) document.body.removeChild(oldContainer);
  }

  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);

  toastRoot = createRoot(container);
  toastRoot.render(<Toast {...props} />);
};
