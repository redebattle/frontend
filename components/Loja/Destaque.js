import { FaChartLine, FaStar } from "react-icons/fa";

export default function LojaJogadorDestaqueComponent() {
  return (
    <div className='bg-top-donator-image bg-opacity-25 rounded-lg border-b-4 border-black flex flex-col items-center justify-center mt-2 p-4'>
      <FaStar className='text-yellow-400 text-4xl' />
      <h1 className='p-1 text-xl uppercase font-bold'>Jogador em destaque</h1>
      <p className='text-sm -mt-1 text-center'>Este e o jogador que mais contribuiu neste mês.</p>
      <p className='text-sm pt-2'>TheMito</p>
      <img className='pb-4' src='https://mc-heads.net/body/TheMito/100' />
    </div>
  )
}
