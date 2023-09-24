

export default function ModalComponent({children,open,close}){

return(
<dialog open={open} className="w-1/2 bg-red-400  inset-x-0 max-w-max mx-auto z-10 border-solid border-2 shadow-lg "
>   
     <div className="flex justify-end">
        <button onClick={close} className="pr-3 pt-1">X</button>
     </div>
    {children}
    
    </dialog>

)

}