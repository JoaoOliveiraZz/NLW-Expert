import NlwLogo from "./assets/logo-nlw-expert.svg";

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

        <div className="rounded-md bg-slate-700 p-5 space-y-3">

          <span className="text-slate-200 text-sm ">Adicionar nota</span>

          <p className="text-slate-400 text-sm leading-6">
            Grave uma nota em áudio que será convertida para texto
            automaticamente
          </p>

        </div>

        <button 
            className="text-left rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-300 transition-all duration-200"
        >
          <span className="text-slate-300 text-sm ">Há 2 dias</span>

          <p className="text-slate-400 text-sm leading-6">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel sequi ratione deleniti ut sint nisi dolor quae, et deserunt rem ipsum, neque quam porro iste. A rem doloremque eius officia. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure eius fuga tempora libero deleniti! Assumenda optio nam magnam debitis minus earum reiciendis repellendus eligendi! Minus vel deserunt perferendis? Molestiae, eveniet.
          </p>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />

        </button>

        

      </div>
    </div>
  );
}
