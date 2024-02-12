import { useState } from "react";
import NlwLogo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./components/newNoteCard";
import { NoteCard } from "./components/noteCard";

interface Notes {
  id: string,
  date: Date,
  content: string
}

export function App() {

  const [notes, setNotes] = useState<Notes[]>([])

  function setNotesOnSave(content: string){
    const newNote: Notes = {
      id: crypto.randomUUID(),
      date: new Date,
      content
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={NlwLogo} alt="Nlw Expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className=" bg-transparent w-full text-3xl outline-none text-slate-500 font-semibold tracking-tight placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">

      <NewNoteCard setNotesOnSave={setNotesOnSave} />

      {
        notes.map(note => {
          return (
            <NoteCard key={note.id} note={note} />
          )
        })
      }

      </div>
    </div>
  );
}
