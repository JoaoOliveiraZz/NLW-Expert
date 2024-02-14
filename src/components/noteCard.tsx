import { formatDistanceToNow } from "date-fns";
import { pt, ptBR } from "date-fns/locale";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from 'lucide-react'

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  },
   onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col rounded-md bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-300 transition-all duration-200 outline-none">
        <span className="text-slate-300 text-sm ">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>

        <p className="text-slate-400 text-sm leading-6">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
      </Dialog.Trigger>

      


      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />    

        <Dialog.Content 
          className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] rounded-md bg-slate-700 flex flex-col overflow-hidden"
        >

          <Dialog.Close 
            className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-500 hover:text-slate-400"
          >
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col p-5 gap-3">
            <span className="text-slate-300 text-sm ">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>

            <p className="text-slate-300 text-sm leading-6">
              {note.content}
            </p>

          </div>
          <button onClick={() => onNoteDeleted(note.id)} className="w-full bg-slate-800 py-4 text-sm text-slate-300 outline-none group">
            Deseja <span className="text-red-400 group-hover:underline">apagar esta nota</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
