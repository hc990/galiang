import React, { useState, useRef } from "react";
import GenericForm from "./GenericForm";
import Button from "./Button";
import { LuX } from "react-icons/lu"
interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea" | "checkbox" | "radio" | "select" | "datepicker" | "daterangepicker";
  required?: boolean;
  validate?: (value: string | boolean, formData: Record<string, string | boolean>) => string | null;
  options?: { value: string; label: string }[]; // For select and radio
  min?: number; // For number
  max?: number; // For number
  step?: number; // For number
  placeholder?: string; // For text, email, password, number, textarea
}

interface DialogProps {
  triggerButtonText: string;
  dialogTitle: string;
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
}

const Dialog: React.FC<DialogProps> = ({
  triggerButtonText,
  dialogTitle,
  fields,
  onSubmit,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    setIsDialogOpen(true);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogRef.current?.close();
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    closeDialog();// Close dialog after successful submission
  };

  return (
    <div>
      <Button
        type="button"
        onClick={openDialog}
        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
      >
        {triggerButtonText}
      </Button>
      <dialog
        ref={dialogRef}
        className="items-top space-x-2 rounded-md bg-gray-50 p-6 shadow-lg  w-full  max-w-4xl "
      >
        <div className="flex justify-between gap-2 mt-4">
        <h2 className="text-lg font-medium text-pink-700 mb-4">{dialogTitle}</h2>
            <Button
                type="button"
                onClick={closeDialog}
                className="px-4 py-2 border border-pink-300 rounded-md text-pink-700 hover:bg-pink-100"
            >
                 <LuX/> 
            </Button>
        </div>
        <GenericForm fields={fields} buttonType={0} onSubmit={handleFormSubmit}/>
      </dialog>
    </div>
  );
};
export default Dialog;
