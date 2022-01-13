export default function LojaCategoriaComponent() {
  return (
    <div className='mt-2 w-80 bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
      <h1 className='p-3 text-xl'>Selecione uma categoria</h1>
      <div className='flex flex-col p-3 mb-3'>
        <button className="bg-purple-600 border-b-4 border-purple-700 rounded-lg h-16 w-56 sm:text-sm font-medium text-white">
          <div className='flex flex-col items-center'>
            VIP
            <div class="badge bg-youtube font-bold">10% OFF</div>
          </div>
        </button>
        <button className="mt-4 bg-purple-600 border-b-4 border-purple-700 rounded-lg h-16 w-56 sm:text-sm font-medium text-white">
          Cash
        </button>
        <button className="mt-4 bg-purple-600 border-b-4 border-purple-700 rounded-lg h-16 w-56 sm:text-sm font-medium text-white">
          Outros
        </button>
      </div>
    </div>
  )
}
