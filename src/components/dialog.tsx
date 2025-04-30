/*
|----------------------------------------------------------------------------------
| Modal Component
|----------------------------------------------------------------------------------
| This component displays a customizable modal dialog with optional header, footer,
| close button, and various size options. It supports closing the modal by clicking
| outside the content area or via a close button.
|
| Props:
| - open (boolean): Controls visibility of the modal.
| - onClose (Dispatch): Function to handle modal close action.
| - title (string): Optional title text for the modal header.
| - children (ReactNode): The main content of the modal.
| - size ("small" | "medium" | "large"): Modal size, defaults to "medium".
| - closeButton (boolean): Show or hide the top-right close button, defaults to true.
| - className (string): Additional class names for the modal container.
| - hasFooter (boolean): Whether to display a footer with a close button.
*/

import clsx from "clsx"
import { Dispatch, ReactNode, SetStateAction } from "react"
import Button from "./button"
import "./css/dialog.css"

type TModalProps = {
  open: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  title?: string
  children?: ReactNode
  size?: "small" | "medium" | "large"
  closeButton?: boolean
  className?: string
  hasFooter?: boolean
}

// Modal Component
const Modal = ({
  open,
  onClose,
  title,
  children,
  size = "medium",
  closeButton = true,
  className,
  hasFooter = false,
}: TModalProps) => {
  if (!open) return null
  const handleClose = () => onClose(false)

  return (
    <div
      className="modal-overlay"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      <div className={clsx("modal-container", `modal-${size}`, className)}>
        <div className="modal-header">
          {title && <div className="modal-title">{title}</div>}
          {closeButton && (
            <button className="modal-close-btn" onClick={handleClose}>
              ✖
            </button>
          )}
        </div>
        <div className="modal-content">{children}</div>
        {hasFooter && (
          <Button
            children={"Close"}
            onClick={handleClose}
            color="secondary"
            className="m-l-auto"
            size="sm"
          />
        )}
      </div>
    </div>
  )
}

export default Modal
