import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import Button from "./Button.tsx";

const Modal = forwardRef( function Modal({children, buttonText, onButtonClick}, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                if(dialog.current)
                dialog.current.showModal();
            }
        }
    })
    
    return createPortal (
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"> 
           <form method="dialog" className="mt-4 text-right">
            <Button onClick={onButtonClick} buttonText={buttonText}></Button>
           </form>
           {children}
        </dialog>,
        document.getElementById("modal-root")
    )
 })

export default Modal