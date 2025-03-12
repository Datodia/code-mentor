'use client'

import { X } from "lucide-react";
import { Button } from "./button";


type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background p-6 rounded-lg shadow-lg w-[700px] relative"
        onClick={(e) => { e.stopPropagation() }}
      >
        <Button
          variant={'outline'}
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <X />
        </Button>
        {children}
      </div>
    </div>
  );
}