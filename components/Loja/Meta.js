import { FaChartLine } from "react-icons/fa";

export default function LojaMetaComponent() {
  return (
    <div className='w-80 bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center mt-2'>
      <h1 className='p-3 text-xl flex flex-row items-center'>Meta mensal <FaChartLine className='ml-2' /></h1>
      <div className='flex flex-row justify-between items-center mb-3 -mt-2'>
        <h1 className='text-xl'>R$ 1,00 / R$ 10,00</h1>
      </div>
      <div className="w-72 bg-gray-200 rounded-full dark:bg-dark3 mb-6">
        <div className="bg-purple-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full space-y-2" style={{width: '10%'}}>
          10%
        </div>
      </div>
  </div>
  )
}
