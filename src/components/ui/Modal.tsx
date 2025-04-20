import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react'
import { memo, ReactNode } from 'react'

interface IModalProps {
  isOpen: boolean
  close: () => void
  children: ReactNode
  title?: string
  description?: string
}

const Modal = ({children,isOpen,close,title, description}: IModalProps) => {
  

  return (
    <>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 bg-black/50 ">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              
              {title && <DialogTitle as="h3" className="text-base/7 font-medium ">
                {title}
              </DialogTitle>}
              {description && <Description className="text-sm/5 text-gray-500 mt-2">
                {description}
              </Description>}
              <div className="mt-4">
              {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default memo(Modal)
