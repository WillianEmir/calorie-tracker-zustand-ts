
export default function Header() {
  return (
    <header className="bg-lime-700">
      <div className="container mx-auto flex justify-between items-center max-sm:flex-col max-sm:text-center max-sm:py-2.5">
        <h1 className="text-white text-4xl font-semibold py-4 uppercase">
          Contador de Calorias
        </h1>

        <button
          className="text-white text-xl font-semibold bg-slate-600 p-2.5 cursor-pointer rounded-md hover:bg-slate-700"
          // onClick={restarApp}
        >
          Reiniciar App
        </button>
      </div>

    </header>
  )
}
