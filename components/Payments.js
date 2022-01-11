import { FaQuestionCircle } from "react-icons/fa";

export default function Payments() {

  return (
    <div className='bg-dark2 border-b-4 border-black m-6 ml-4 p-4 rounded-lg'>
    <div className='p-4'>
      <h1 className='text-xl text-yellow-500 flex flex-row items-center'><FaQuestionCircle className='mr-2' />Precisa de ajuda? Clique aqui.</h1>
      <p className='mt-3'>
        Aceitamos várias formas de pagamento, incluindo as principais bandeiras de cartão de crédito, boleto bancário, Pix, MercadoPago e PayPal.
      </p>
    </div>
    <div className='flex flex-row p-4 items-center justify-center'>
      <img className='p-1 h-10 w-14 bg-white rounded-md ml-5 mr-5' src="/img/mercado-pago.svg" alt="Mercado Pago" />
      <img className='p-1 h-10 w-14 bg-white rounded-md mr-5' src="/img/pix.svg" alt="Pix" />
      <img src="/img/payment_methods.png" alt="Métodos de Pagamentos" />
      <img className='p-1 h-10 w-14 bg-white rounded-md ml-5' src="/img/paypal.svg" alt="Paypal" />
    </div>
    <div className='flex flex-row p-4 items-center justify-center'>
      <a href="https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Fredebattle.com.br%2Floja"><img src="/img/google-safe-browsing.svg" alt="Safe Browsing" /></a>
    </div>
  </div>
  )
}
