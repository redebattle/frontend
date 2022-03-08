import { BsRecordFill } from "react-icons/bs";

export default function StreamersIndex() {
  return (
    <>
      <div className='lg:m-8 sm:m-4 sm:p-4 lg:p-8 border-b-4 border-red-500'>
        <h1 className='flex flex-row items-center font-bold text-2xl'>STREAMERS ONLINE <BsRecordFill className='ml-2 text-red-500' /></h1>
      </div>
      <div className='flex flex-wrap px-6 mx-4'>
        <div className='p-2'>
          <div className='flex bg-header-image rounded-lg sm:w-[360px] lg:w-[340px] h-[190px]'>
            <div className='flex flex-col items-center justify-center bg-black bg-opacity-40 overflow-hidden cursor-pointer w-full h-full rounded-lg hover:hidden'>
              <h1 className='font-bold text-xl'>TheMito</h1>
              <p className='text-lg'>1.000 espectadores</p>
            </div>
          </div>
        </div>
        <div className='p-2'>
          <div className='flex bg-header-image rounded-lg sm:w-[360px] lg:w-[340px] h-[190px]'>
            <div className='flex flex-col items-center justify-center bg-black bg-opacity-40 overflow-hidden cursor-pointer w-full h-full rounded-lg hover:hidden'>
              <h1 className='font-bold text-xl'>TheMito</h1>
              <p className='text-lg'>1.000 espectadores</p>
            </div>
          </div>
        </div>
        <div className='p-2'>
          <div className='flex bg-header-image rounded-lg sm:w-[360px] lg:w-[340px] h-[190px]'>
            <div className='flex flex-col items-center justify-center bg-black bg-opacity-40 overflow-hidden cursor-pointer w-full h-full rounded-lg hover:hidden'>
              <h1 className='font-bold text-xl'>TheMito</h1>
              <p className='text-lg'>1.000 espectadores</p>
            </div>
          </div>
        </div>
        <div className='p-2'>
          <div className='flex bg-header-image rounded-lg sm:w-[360px] lg:w-[340px] h-[190px]'>
            <div className='flex flex-col items-center justify-center bg-black bg-opacity-40 overflow-hidden cursor-pointer w-full h-full rounded-lg hover:hidden'>
              <h1 className='font-bold text-xl'>TheMito</h1>
              <p className='text-lg'>1.000 espectadores</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
