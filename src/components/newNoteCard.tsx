import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  setNotesOnSave: (content: string) => void
}

export function NewNoteCard({ setNotesOnSave }: NewNoteCardProps){

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [content, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)

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

      if(content === ''){
        return
      }

      setNotesOnSave(content)

      handleShowEditor()

      setContent('')

      toast.success('Nota criada com sucesso')
    }

    function handleStartRecording(){

      const browserSupportsSpeechRecognitionApi = 
        'SpeechRecognition' in window 
        || 'webkitSpeechRecognition' in window

      if(!browserSupportsSpeechRecognitionApi){
        toast.error('Infelizmente o reconhecimento de fala não é suportado pelo seu navegador')
        return
      }

      handleShowEditor()
      setIsRecording(true)

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

      const speechRecognition = new SpeechRecognitionAPI()

      speechRecognition.lang = 'pt-BR'
      speechRecognition.continuous = true
      speechRecognition.maxAlternatives = 1
      speechRecognition.interimResults = true

      speechRecognition.onresult = (event) => {
        const transcription = Array.from(event.results).reduce((text, result) => {
          return text.concat(result[0].transcript)
        }, '')

        setContent(transcription)
      }

      speechRecognition.onerror = (event) => {
        console.error(event)
      }

      speechRecognition.start()

    }

    function handleStopRecording(){
      setIsRecording(false)
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

              <form className='flex-1 flex flex-col'>

                <div className="flex flex-1 flex-col p-5 gap-3">
                  <span className="text-slate-300 text-sm">
                    Adicionar nota
                  </span>

                  {
                    shouldShowOnboarding ? (
                      <p className="text-slate-300 text-sm leading-6">
                        Comece <button onClick={handleStartRecording} className='text-lime-400 cursor-pointer hover:underline'>gravando uma nota</button> em áudio ou se preferir <button onClick={handleShowEditor} className='text-lime-400 cursor-pointer hover:underline'>utilize apenas texto</button>.
                      </p>
                    ) : (
                        <textarea
                          autoFocus
                          onChange={handleChangeContent}
                          className='flex-1 text-sm text-slate-300 resize-none bg-transparent outline-none'
                          value={content}
                        />
                    )
                  }

                </div>

                {
                  isRecording ? (
                     <button 
                      type='button'
                      className="flex items-center justify-center gap-3 w-full bg-slate-800 py-4 text-sm text-slate-300 outline-none group font-medium hover:text-slate-100"
                      onClick={handleStopRecording}
                     >
                      <div className='size-3 bg-red-500 rounded-full animate-pulse' />
                      Gravando! (Clique p/ interromper)
                    </button>
                  )
                  :
                  (
                     <button 
                      type='button'
                      onClick={handleSubmitNewNote}
                      className="w-full bg-lime-400 py-4 text-sm text-lime-900 outline-none group font-medium hover:bg-lime-500"
                     >
                      Salvar nota
                    </button>
                  )
                }

               
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    )
}