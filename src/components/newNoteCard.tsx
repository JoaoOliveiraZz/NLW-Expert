import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'


export function NewNoteCard(){

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [content, setContent] = useState('')

    function handleShowEditor(){
      setShouldShowOnboarding(!shouldShowOnboarding)
    }

    function handleChangeContent(event: ChangeEvent<HTMLTextAreaElement>){
      setContent(event.target.value)

      if(event.target.value === ''){
        handleShowEditor()
      }
    }

    function handleSubmitNewNote(event: FormEvent){
      event.preventDefault()
      console.log(content)

      toast.success('Nota criada com sucesso')
    }

    return (
      <Dialog.Root>
          <Dialog.Trigger 
            className="flex flex-col text-left rounded-md bg-slate-700 p-5 space-y-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-300 transition-all duration-200 outline-none"
          >

            <span className="text-slate-200 text-sm ">Adicionar nota</span>

            <p className="text-slate-400 text-sm leading-6">
              Grave uma nota em áudio que será convertida para texto
              automaticamente
            </p>

          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 inset-0 fixed" />    

            <Dialog.Content 
              className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] rounded-md bg-slate-700 flex flex-col overflow-hidden outline-none"
            >

              <Dialog.Close 
                className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-500 hover:text-slate-400"
              >
                <X className="size-5" />
              </Dialog.Close>

              <form onSubmit={handleSubmitNewNote} className='flex-1 flex flex-col'>

                <div className="flex flex-1 flex-col p-5 gap-3">
                  <span className="text-slate-300 text-sm">
                    Adicionar nota
                  </span>

                  {
                    shouldShowOnboarding ? (
                      <p className="text-slate-300 text-sm leading-6">
                        Comece <span className='text-lime-400 cursor-pointer hover:underline'>gravando uma nota</span> em áudio ou se preferir <button onClick={handleShowEditor} className='text-lime-400 cursor-pointer hover:underline'>utilize apenas texto</button>.
                      </p>
                    ) : (
                        <textarea
                          autoFocus
                          onChange={handleChangeContent}
                          className='flex-1 text-sm text-slate-300 resize-none bg-transparent outline-none'
                        />
                    )
                  }

                </div>
                <button 
                  type='submit'
                  className="w-full bg-lime-400 py-4 text-sm text-lime-900 outline-none group font-medium hover:bg-lime-500"
                >
                  Salvar nota
                </button>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    )
}