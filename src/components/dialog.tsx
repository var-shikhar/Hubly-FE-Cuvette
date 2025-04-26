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
