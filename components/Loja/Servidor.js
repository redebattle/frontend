export default function LojaServidorComponent({ servidores }) {
  return (
    <div className="mt-2 bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center">
      <h1 className="p-3 text-xl">Selecione o servidor</h1>
      <div className="flex flex-col mb-3">
        {servidores?.map(servidor => {
          return (
            <button
              onClick={() => {}}
              className="bg-purple-600 border-b-4 border-purple-700 rounded-lg h-16 w-56 sm:text-sm font-medium text-white my-2"
            >
              <div className="flex flex-col items-center">
                {servidor?.nome}
                <div className="badge bg-youtube font-bold">10% OFF</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
