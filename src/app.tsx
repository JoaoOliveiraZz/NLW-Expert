import NlwLogo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./components/newNoteCard";
import { NoteCard } from "./components/noteCard";

export function App() {
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

      <NewNoteCard />

      <NoteCard />

      </div>
    </div>
  );
}
