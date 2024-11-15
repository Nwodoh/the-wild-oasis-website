"use client";
import { useFormStatus } from "react-dom";

function SubmitBtn({ mainElement, pendingElement = "Updating...", className }) {
  const { pending } = useFormStatus();
  return (
    <button className={className} disabled={pending}>
      {pending ? pendingElement : mainElement}
    </button>
  );
}

export default SubmitBtn;
