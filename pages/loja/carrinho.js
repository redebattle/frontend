import cep from 'cep-promise'
import { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { useForm } from 'react-hook-form'
import { cpf } from 'cpf-cnpj-validator'

import api from '../../service/api'
import apiWay from '../../service/apiWay'

import Manutencao from '../../components/Manutencao'
import ErrorAPI from '../../components/ErrorAPI'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Payments from '../../components/Loja/Payments'
import {
  FaGift,
  FaInfoCircle,
  FaMoneyBillWave,
  FaShoppingBasket,
  FaTag,
  FaTrashAlt
} from 'react-icons/fa'

export default function LojaCarrinho({ statusCode, manutencao, userIP }) {
  const [cityForm, setCityForm] = useState()
  const [streetForm, setStreetForm] = useState()
  const [neighborhoodForm, setNeighborhoodForm] = useState()
  const [stateForm, setStateForm] = useState()
  const [responseCEP, setResponseCEP] = useState()
  const [cepError, setCepError] = useState()
  const [cpfValid, setCpfValid] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState()

  if (statusCode?.code !== 200) {
    return <ErrorAPI statusCode={statusCode} />
  }

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  async function checkCPF(e) {
    let userCPF = e.target.value
    if (userCPF.length === 14) {
      const response = await cpf.isValid(userCPF)
      setCpfValid(response)
    }
  }

  async function handlePayment(e) {
    setPaymentMethod(e.target.value)
  }

  async function handleCheckOut(data) {
    console.log('TESTE:::', neighborhoodForm)
    console.log('NOME::: ' + data.nome)
    console.log('NASCIMENTO::: ' + data.dtNascimento)
    console.log('CELULAR::: ' + data.telefone)
    console.log('CPF::: ' + data.cpf)
    console.log('PAIS::: ' + data.pais)
    console.log('CEP::: ' + data.cepForm)
    console.log('RUA::: ' + data.logradouro)
    console.log('BAIRRO::: ' + data.bairro)
    console.log('NUMERO::: ' + data.numero)
    console.log('CIDADE::: ' + data.cidade)
    console.log('ESTADO::: ' + data.uf)
    console.log('CUPOM::: ' + data.cupom)
    console.log('PRESENTE::: ' + data.presente)
    console.log('TERMOS::: ' + data.termos)
    console.log('GATEWAY::: ' + data.gateway)
    console.log('IP::: ' + userIP)
  }

  async function limparCampos() {
    await setCepError(null)
    await setResponseCEP(null)
    await setStateForm(null)
    await setCityForm(null)
    await setStreetForm(null)
    await setNeighborhoodForm(null)
  }

  async function handleCEPChange(e) {
    let userCEP = e.target.value
    if (userCEP.length === 9) {
      await limparCampos()
      const response = await cep(userCEP)
        .then(res => res)
        .catch(res => setCepError(res))
      await setStateForm(response?.state)
      await setCityForm(response?.city)
      await setStreetForm(response?.street)
      await setNeighborhoodForm(response?.neighborhood)
      await setResponseCEP(response)
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(handleCheckOut)}>
        <div className="INDEX">
          <title>Carrinho | Rede Battle</title>
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-4 lg:mr-4 sm:mr-0 m-2 p-4">
            <h1 className="p-1 text-xl uppercase font-bold flex flex-row items-center">
              CARRINHO DE COMPRA
            </h1>
          </div>
          <div className="flex sm:flex-col md:flex-col xl:flex-row mt-4 lg:mr-10 sm:m-2 xl:m-2">
            <div className="flex flex-col w-full mr-6">
              <div className="w-full bg-dark2 border-b-4 border-black rounded-lg p-4 lg:ml-5 sm:ml-0 sm:mt-0">
                <h1 className="p-1 text-xl uppercase font-bold flex items-center flex-row">
                  <FaShoppingBasket className="mr-2" />
                  Seus produtos
                </h1>
              </div>
              <div className="mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 lg:ml-5 mb-3 sm:ml-0 sm:mt-3">
                <table className="w-full table-compact border border-dark">
                  <thead className="text-base bg-dark rounded-lg">
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Valor unitário</th>
                      <th>Total</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody className="text-xl">
                    <tr class="">
                      <td className="">
                        VIP 1 <br /> Servidor: RankUP
                      </td>
                      <td>
                        <input
                          type="number"
                          className="bg-dark border-none w-16  text-center"
                          value={1}
                        />
                      </td>
                      <td>R$ 10,00</td>
                      <td>R$ 10,00</td>
                      <td>
                        <FaTrashAlt className="hover:text-red-600 cursor-pointer" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <div className='flex lg:flex-row sm:flex-col items-center lg:justify-evenly sm:justify-center'>
                  <img className='w-20 h-20 rounded-lg' src="/img/sem-foto.png" />
                  <h1 className='text-xl sm:text-sm font-bold lg:m-0 sm:mt-2'>VIP 1</h1>
                  <h1 className='text-xl sm:text-sm font-bold p-1 lg:m-0 sm:mb-2'>R$ 10,00</h1>
                  <div className='flex flex-row items-center'>
                    <button className="bg-purple-600 hover:bg-purple-800 hover:border-purple-800 border-b-2 border-purple-700 rounded-full font-bold text-white lg:w-9 lg:h-9 sm:w-6 sm:h-6 mr-4">-</button>
                    <h1>1</h1>
                    <button className="bg-purple-600 hover:bg-purple-800 hover:border-purple-800 border-b-2 border-purple-700 rounded-full font-bold text-white lg:w-9 lg:h-9 sm:w-6 sm:h-6 ml-4">+</button>
                    <button className="bg-red-600 hover:bg-red-900 hover:border-red-900 border-b-2 border-red-700 rounded-full font-bold text-white lg:w-9 lg:h-9 sm:w-6 sm:h-6 ml-6 flex items-center justify-center"><FaTrashAlt /></button>
                  </div>
                </div> */}
              </div>
              <div className="w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mt-3 lg:ml-5 sm:ml-0 sm:mt-0">
                <h1 className="p-1 text-xl uppercase font-bold flex flex-row items-center">
                  <FaMoneyBillWave className="mr-2" />
                  SEUS DADOS
                </h1>
              </div>
              <div className="flex flex-col justify-center my-3 w-full bg-dark2 border-b-4 border-black rounded-lg lg:p-4 sm:p-0 lg:ml-5 sm:ml-0 sm:mt-3">
                <div className="flex flex-col lg:p-6 my-2 sm:p-0 text-normal">
                  <div className="flex lg:flex-row sm:flex-col">
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> NOME COMPLETO
                      </label>
                      <input
                        {...register('nome')}
                        type="text"
                        id="nome"
                        required
                        className="px-4 py-2 lg:w-96 sm:w-auto  bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                      />
                      {errors.nome?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          O nome é obrigatório.
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> DATA NASCIMENTO
                      </label>
                      <ReactInputMask
                        {...register('dtNascimento')}
                        type="text"
                        mask="99/99/9999"
                        maskChar=""
                        id="dtNascimento"
                        required
                        className="px-4 py-2 lg:w-40 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                      />
                      {errors.dtNascimento?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          A data de nascimento é obrigatória.
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex lg:flex-row sm:flex-col">
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> CELULAR
                      </label>
                      <ReactInputMask
                        {...register('telefone')}
                        type="text"
                        mask="(99) 99999-9999"
                        maskChar=""
                        id="telefone"
                        required
                        className="px-4 py-2 lg:w-80 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                      />
                      {errors.telefone?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          O celular é obrigatório.
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> CPF
                      </label>
                      <ReactInputMask
                        {...register('cpf', { required: true })}
                        type="text"
                        mask="999.999.999-99"
                        maskChar=""
                        onChange={checkCPF}
                        id="cpf"
                        required
                        className="px-4 py-2 lg:w-80 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                      />
                      {errors.cpf?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          O CPF é obrigatório.
                        </label>
                      )}
                      {!cpfValid && (
                        <label className="text-red-600 ml-1">
                          O CPF é inválido.
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mx-4">
                    <label className="ml-1 mt-4 mb-1">
                      <a className="text-youtube">*</a> PAÍS
                    </label>
                    {(responseCEP && (
                      <select
                        {...register('pais')}
                        type="text"
                        id="pais"
                        value="Brasil"
                        required
                        disabled
                        className="px-4 py-2 lg:w-96 sm:w-auto  bg-dark4 text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg cursor-not-allowed"
                      >
                        <option value="África do Sul">África do Sul</option>
                        <option value="Albânia">Albânia</option>
                        <option value="Alemanha">Alemanha</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antigua">Antigua</option>
                        <option value="Arábia Saudita">Arábia Saudita</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armênia">Armênia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Austrália">Austrália</option>
                        <option value="Áustria">Áustria</option>
                        <option value="Azerbaijão">Azerbaijão</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrein">Bahrein</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Bélgica">Bélgica</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermudas">Bermudas</option>
                        <option value="Botsuana">Botsuana</option>
                        <option value="Brasil" selected>
                          Brasil
                        </option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgária">Bulgária</option>
                        <option value="Burkina Fasso">Burkina Fasso</option>
                        <option value="botão">botão</option>
                        <option value="Cabo Verde">Cabo Verde</option>
                        <option value="Camarões">Camarões</option>
                        <option value="Camboja">Camboja</option>
                        <option value="Canadá">Canadá</option>
                        <option value="Cazaquistão">Cazaquistão</option>
                        <option value="Chade">Chade</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Cidade do Vaticano">
                          Cidade do Vaticano
                        </option>
                        <option value="Colômbia">Colômbia</option>
                        <option value="Congo">Congo</option>
                        <option value="Coréia do Sul">Coréia do Sul</option>
                        <option value="Costa do Marfim">Costa do Marfim</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croácia">Croácia</option>
                        <option value="Dinamarca">Dinamarca</option>
                        <option value="Djibuti">Djibuti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="EUA">EUA</option>
                        <option value="Egito">Egito</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Emirados Árabes">Emirados Árabes</option>
                        <option value="Equador">Equador</option>
                        <option value="Eritréia">Eritréia</option>
                        <option value="Escócia">Escócia</option>
                        <option value="Eslováquia">Eslováquia</option>
                        <option value="Eslovênia">Eslovênia</option>
                        <option value="Espanha">Espanha</option>
                        <option value="Estônia">Estônia</option>
                        <option value="Etiópia">Etiópia</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Filipinas">Filipinas</option>
                        <option value="Finlândia">Finlândia</option>
                        <option value="França">França</option>
                        <option value="Gabão">Gabão</option>
                        <option value="Gâmbia">Gâmbia</option>
                        <option value="Gana">Gana</option>
                        <option value="Geórgia">Geórgia</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Granada">Granada</option>
                        <option value="Grécia">Grécia</option>
                        <option value="Guadalupe">Guadalupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guiana">Guiana</option>
                        <option value="Guiana Francesa">Guiana Francesa</option>
                        <option value="Guiné-bissau">Guiné-bissau</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Holanda">Holanda</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungria">Hungria</option>
                        <option value="Iêmen">Iêmen</option>
                        <option value="Ilhas Cayman">Ilhas Cayman</option>
                        <option value="Ilhas Cook">Ilhas Cook</option>
                        <option value="Ilhas Curaçao">Ilhas Curaçao</option>
                        <option value="Ilhas Marshall">Ilhas Marshall</option>
                        <option value="Ilhas Turks & Caicos">
                          Ilhas Turks & Caicos
                        </option>
                        <option value="Ilhas Virgens (brit.)">
                          Ilhas Virgens (brit.)
                        </option>
                        <option value="Ilhas Virgens(amer.)">
                          Ilhas Virgens(amer.)
                        </option>
                        <option value="Ilhas Wallis e Futuna">
                          Ilhas Wallis e Futuna
                        </option>
                        <option value="Índia">Índia</option>
                        <option value="Indonésia">Indonésia</option>
                        <option value="Inglaterra">Inglaterra</option>
                        <option value="Irlanda">Irlanda</option>
                        <option value="Islândia">Islândia</option>
                        <option value="Israel">Israel</option>
                        <option value="Itália">Itália</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japão">Japão</option>
                        <option value="Jordânia">Jordânia</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Líbano">Líbano</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lituânia">Lituânia</option>
                        <option value="Luxemburgo">Luxemburgo</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedônia">Macedônia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malásia">Malásia</option>
                        <option value="Malaui">Malaui</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marrocos">Marrocos</option>
                        <option value="Martinica">Martinica</option>
                        <option value="Mauritânia">Mauritânia</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="México">México</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Mônaco">Mônaco</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Nicarágua">Nicarágua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigéria">Nigéria</option>
                        <option value="Noruega">Noruega</option>
                        <option value="Nova Caledônia">Nova Caledônia</option>
                        <option value="Nova Zelândia">Nova Zelândia</option>
                        <option value="Omã">Omã</option>
                        <option value="Palau">Palau</option>
                        <option value="Panamá">Panamá</option>
                        <option value="Papua-nova Guiné">
                          Papua-nova Guiné
                        </option>
                        <option value="Paquistão">Paquistão</option>
                        <option value="Peru">Peru</option>
                        <option value="Polinésia Francesa">
                          Polinésia Francesa
                        </option>
                        <option value="Polônia">Polônia</option>
                        <option value="Porto Rico">Porto Rico</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Quênia">Quênia</option>
                        <option value="Rep. Dominicana">Rep. Dominicana</option>
                        <option value="Rep. Tcheca">Rep. Tcheca</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romênia">Romênia</option>
                        <option value="Ruanda">Ruanda</option>
                        <option value="Rússia">Rússia</option>
                        <option value="Saipan">Saipan</option>
                        <option value="Samoa Americana">Samoa Americana</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serra Leone">Serra Leone</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Singapura">Singapura</option>
                        <option value="Síria">Síria</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="St. Kitts & Nevis">
                          St. Kitts & Nevis
                        </option>
                        <option value="St. Lúcia">St. Lúcia</option>
                        <option value="St. Vincent">St. Vincent</option>
                        <option value="Sudão">Sudão</option>
                        <option value="Suécia">Suécia</option>
                        <option value="Suiça">Suiça</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Tailândia">Tailândia</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tanzânia">Tanzânia</option>
                        <option value="Togo">Togo</option>
                        <option value="Trinidad & Tobago">
                          Trinidad & Tobago
                        </option>
                        <option value="Tunísia">Tunísia</option>
                        <option value="Turquia">Turquia</option>
                        <option value="Ucrânia">Ucrânia</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Uruguai">Uruguai</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnã">Vietnã</option>
                        <option value="Zaire">Zaire</option>
                        <option value="Zâmbia">Zâmbia</option>
                        <option value="Zimbábue">Zimbábue</option>
                      </select>
                    )) || (
                      <select
                        {...register('pais', { required: true })}
                        type="text"
                        id="pais"
                        value="Brasil"
                        required
                        className="px-4 py-2 lg:w-96 sm:w-auto  bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                      >
                        <option value="África do Sul">África do Sul</option>
                        <option value="Albânia">Albânia</option>
                        <option value="Alemanha">Alemanha</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antigua">Antigua</option>
                        <option value="Arábia Saudita">Arábia Saudita</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armênia">Armênia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Austrália">Austrália</option>
                        <option value="Áustria">Áustria</option>
                        <option value="Azerbaijão">Azerbaijão</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrein">Bahrein</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Bélgica">Bélgica</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermudas">Bermudas</option>
                        <option value="Botsuana">Botsuana</option>
                        <option value="Brasil" selected>
                          Brasil
                        </option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgária">Bulgária</option>
                        <option value="Burkina Fasso">Burkina Fasso</option>
                        <option value="botão">botão</option>
                        <option value="Cabo Verde">Cabo Verde</option>
                        <option value="Camarões">Camarões</option>
                        <option value="Camboja">Camboja</option>
                        <option value="Canadá">Canadá</option>
                        <option value="Cazaquistão">Cazaquistão</option>
                        <option value="Chade">Chade</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Cidade do Vaticano">
                          Cidade do Vaticano
                        </option>
                        <option value="Colômbia">Colômbia</option>
                        <option value="Congo">Congo</option>
                        <option value="Coréia do Sul">Coréia do Sul</option>
                        <option value="Costa do Marfim">Costa do Marfim</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croácia">Croácia</option>
                        <option value="Dinamarca">Dinamarca</option>
                        <option value="Djibuti">Djibuti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="EUA">EUA</option>
                        <option value="Egito">Egito</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Emirados Árabes">Emirados Árabes</option>
                        <option value="Equador">Equador</option>
                        <option value="Eritréia">Eritréia</option>
                        <option value="Escócia">Escócia</option>
                        <option value="Eslováquia">Eslováquia</option>
                        <option value="Eslovênia">Eslovênia</option>
                        <option value="Espanha">Espanha</option>
                        <option value="Estônia">Estônia</option>
                        <option value="Etiópia">Etiópia</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Filipinas">Filipinas</option>
                        <option value="Finlândia">Finlândia</option>
                        <option value="França">França</option>
                        <option value="Gabão">Gabão</option>
                        <option value="Gâmbia">Gâmbia</option>
                        <option value="Gana">Gana</option>
                        <option value="Geórgia">Geórgia</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Granada">Granada</option>
                        <option value="Grécia">Grécia</option>
                        <option value="Guadalupe">Guadalupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guiana">Guiana</option>
                        <option value="Guiana Francesa">Guiana Francesa</option>
                        <option value="Guiné-bissau">Guiné-bissau</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Holanda">Holanda</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungria">Hungria</option>
                        <option value="Iêmen">Iêmen</option>
                        <option value="Ilhas Cayman">Ilhas Cayman</option>
                        <option value="Ilhas Cook">Ilhas Cook</option>
                        <option value="Ilhas Curaçao">Ilhas Curaçao</option>
                        <option value="Ilhas Marshall">Ilhas Marshall</option>
                        <option value="Ilhas Turks & Caicos">
                          Ilhas Turks & Caicos
                        </option>
                        <option value="Ilhas Virgens (brit.)">
                          Ilhas Virgens (brit.)
                        </option>
                        <option value="Ilhas Virgens(amer.)">
                          Ilhas Virgens(amer.)
                        </option>
                        <option value="Ilhas Wallis e Futuna">
                          Ilhas Wallis e Futuna
                        </option>
                        <option value="Índia">Índia</option>
                        <option value="Indonésia">Indonésia</option>
                        <option value="Inglaterra">Inglaterra</option>
                        <option value="Irlanda">Irlanda</option>
                        <option value="Islândia">Islândia</option>
                        <option value="Israel">Israel</option>
                        <option value="Itália">Itália</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japão">Japão</option>
                        <option value="Jordânia">Jordânia</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Líbano">Líbano</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lituânia">Lituânia</option>
                        <option value="Luxemburgo">Luxemburgo</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedônia">Macedônia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malásia">Malásia</option>
                        <option value="Malaui">Malaui</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marrocos">Marrocos</option>
                        <option value="Martinica">Martinica</option>
                        <option value="Mauritânia">Mauritânia</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="México">México</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Mônaco">Mônaco</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Nicarágua">Nicarágua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigéria">Nigéria</option>
                        <option value="Noruega">Noruega</option>
                        <option value="Nova Caledônia">Nova Caledônia</option>
                        <option value="Nova Zelândia">Nova Zelândia</option>
                        <option value="Omã">Omã</option>
                        <option value="Palau">Palau</option>
                        <option value="Panamá">Panamá</option>
                        <option value="Papua-nova Guiné">
                          Papua-nova Guiné
                        </option>
                        <option value="Paquistão">Paquistão</option>
                        <option value="Peru">Peru</option>
                        <option value="Polinésia Francesa">
                          Polinésia Francesa
                        </option>
                        <option value="Polônia">Polônia</option>
                        <option value="Porto Rico">Porto Rico</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Quênia">Quênia</option>
                        <option value="Rep. Dominicana">Rep. Dominicana</option>
                        <option value="Rep. Tcheca">Rep. Tcheca</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romênia">Romênia</option>
                        <option value="Ruanda">Ruanda</option>
                        <option value="Rússia">Rússia</option>
                        <option value="Saipan">Saipan</option>
                        <option value="Samoa Americana">Samoa Americana</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serra Leone">Serra Leone</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Singapura">Singapura</option>
                        <option value="Síria">Síria</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="St. Kitts & Nevis">
                          St. Kitts & Nevis
                        </option>
                        <option value="St. Lúcia">St. Lúcia</option>
                        <option value="St. Vincent">St. Vincent</option>
                        <option value="Sudão">Sudão</option>
                        <option value="Suécia">Suécia</option>
                        <option value="Suiça">Suiça</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Tailândia">Tailândia</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tanzânia">Tanzânia</option>
                        <option value="Togo">Togo</option>
                        <option value="Trinidad & Tobago">
                          Trinidad & Tobago
                        </option>
                        <option value="Tunísia">Tunísia</option>
                        <option value="Turquia">Turquia</option>
                        <option value="Ucrânia">Ucrânia</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Uruguai">Uruguai</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnã">Vietnã</option>
                        <option value="Zaire">Zaire</option>
                        <option value="Zâmbia">Zâmbia</option>
                        <option value="Zimbábue">Zimbábue</option>
                      </select>
                    )}
                    {errors.pais?.type === 'required' && (
                      <label className="text-red-600 ml-1">
                        O pais é obrigatório.
                      </label>
                    )}
                  </div>
                  <div className="flex flex-wrap">
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> CEP
                      </label>
                      <ReactInputMask
                        {...register('cepForm')}
                        type="text"
                        mask="99999-999"
                        maskChar=""
                        id="cep"
                        required
                        onChange={handleCEPChange}
                        className="underline-0 px-4 py-2 lg:w-80 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                      />
                      {errors?.cep?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          O CEP é obrigatório.
                        </label>
                      )}
                      {cepError && (
                        <label className="text-red-600 ml-1">
                          O CEP é inválido.
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex lg:flex-row sm:flex-col">
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> RUA/AVENIDA
                      </label>
                      {(responseCEP && (
                        <input
                          {...register('logradouro')}
                          type="text"
                          id="logradouro"
                          value={streetForm ? streetForm : null}
                          disabled
                          required
                          className="px-4 py-2 lg:w-72 sm:w-auto bg-dark4 text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg cursor-not-allowed"
                        />
                      )) || (
                        <input
                          {...register('logradouro')}
                          type="text"
                          id="logradouro"
                          value={streetForm ? streetForm : null}
                          required
                          className="px-4 py-2 lg:w-72 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                        />
                      )}
                      {errors?.logradouro?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          A rua é obrigatório.
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> BAIRRO
                      </label>
                      {(responseCEP && (
                        <input
                          {...register('bairro')}
                          type="text"
                          id="bairro"
                          value={neighborhoodForm ? neighborhoodForm : null}
                          required
                          disabled
                          className="px-4 py-2 lg:w-72 sm:w-auto bg-dark4 text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg cursor-not-allowed"
                        />
                      )) || (
                        <input
                          {...register('bairro')}
                          type="text"
                          id="bairro"
                          value={neighborhoodForm ? neighborhoodForm : null}
                          required
                          className="px-4 py-2 lg:w-72 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> NÚMERO
                      </label>
                      <ReactInputMask
                        {...register('numero', { required: true })}
                        type="text"
                        id="numero"
                        mask="999999"
                        maskChar=""
                        required
                        className="px-4 py-2 lg:w-24 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                      />
                      {errors.numero?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          O número é obrigatório.
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex lg:flex-row sm:flex-col">
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> CIDADE
                      </label>
                      {(responseCEP && (
                        <input
                          {...register('cidade')}
                          type="text"
                          id="cidade"
                          value={cityForm ? cityForm : null}
                          required
                          disabled
                          className="px-4 py-2 lg:w-80 sm:w-auto bg-dark4 text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg cursor-not-allowed"
                        />
                      )) || (
                        <input
                          {...register('cidade', { required: true })}
                          type="text"
                          id="cidade"
                          value={cityForm ? cityForm : null}
                          required
                          className="px-4 py-2 lg:w-80 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                        />
                      )}
                      {errors.cidade?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          A cidade é obrigatória.
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col mx-4">
                      <label className="ml-1 mt-4 mb-1">
                        <a className="text-youtube">*</a> ESTADO
                      </label>
                      {(responseCEP && (
                        <select
                          {...register('uf')}
                          id="uf"
                          value={stateForm ? stateForm : null}
                          required
                          disabled
                          className="px-4 py-2 lg:w-80 sm:w-auto bg-dark4 text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg cursor-not-allowed"
                        >
                          <option value={null}>Selecione</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      )) || (
                        <select
                          {...register('uf', { required: true })}
                          id="uf"
                          value={stateForm ? stateForm : null}
                          required
                          className="px-4 py-2 lg:w-80 sm:w-auto bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-2 border-black rounded-lg"
                        >
                          <option value={null}>Selecione</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      )}
                      {errors.uf?.type === 'required' && (
                        <label className="text-red-600 ml-1">
                          O estado é obrigatória.
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between">
                  <div className="flex flex-row items-center justify-center">
                    <FaInfoCircle className="mr-2" /> Por que precisamos dessas
                    informações?
                  </div>
                </div>
              </div>
              {/* <div className='w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mt-3 lg:ml-5 sm:ml-0 sm:mt-0'>
                <h1 className='p-1 text-xl uppercase font-bold flex flex-row items-center'><FaMoneyBillWave className='mr-2' />PAGAMENTO</h1>
              </div>
              <div className='flex flex-col items-center justify-center mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 lg:ml-5 sm:ml-0 sm:mt-3'>
                <div className='flex lg:flex-row sm:flex-col items-center lg:justify-evenly sm:justify-center p-4 text-normal'>
                  <h1>Pagamentos via cartão de cédito, ou saldo em conta, geralmente, são aprovados imediatamente. Boletos podem demorar até 2 dias úteis, após o pagamento, para serem aprovados.</h1>
                </div>
                <div className='my-6 bg-dark4 p-4 rounded-lg w-64 h-auto hover:border-2 hover:border-mercadopago hover:to-mercadopago2 cursor-pointer'>
                  <img className='grayscale hover:grayscale-0' src='/img/mercado-pago.svg' />
                </div>
                <div className='p-4'>
                  <input type="checkbox" className="mr-2 checkbox checkbox-primary focus:border-transparent focus:ring-0" />
                  Li e estou ciente dos <a className='font-bold text-roxo underline hover:text-purple-700' href='/loja/termos'>Termos de Compra</a> para os produtos que estou adquirindo.
                </div>
                <div className='p-4 mt-4'>
                  <button className="flex items-center justify-center px-4 bg-purple-500 focus:outline-none hover:bg-purple-700 border-b-4 border-black rounded-lg text-base w-64 h-12">
                    Finalizar pedido
                  </button>
                </div>
                <div className='text-xs'>
                  Seu IP XXXXX está sendo gravado por segurança.
                </div>
              </div> */}
            </div>
            <div className="flex flex-col h-auto w-auto lg:ml-5 sm:ml-0 sm:mt-3">
              <div className="bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center">
                <h1 className="p-3 text-xl uppercase font-bold">
                  Resumo do pedido
                </h1>
              </div>
              <div className="bg-dark2 rounded-lg border-b-4 border-black flex flex-col items-center justify-center mt-2 p-4">
                <div className="flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center justify-center p-1">
                    <h1 className="font-bold text-md">Subtotal:</h1>
                    <h1 className="font-bold text-2xl">R$ 10,00</h1>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1">
                    <h1 className="font-bold text-md">Descontos:</h1>
                    <h1 className="font-bold text-2xl text-red-500">
                      - R$ 2,00
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1">
                    <h1 className="font-bold text-md">Valor total:</h1>
                    <h1 className="font-bold text-2xl text-lime-500">
                      R$ 8,00
                    </h1>
                  </div>
                </div>
              </div>
              <div className="mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5">
                <div className="flex flex-col items-center text-xl font-bold p-2">
                  <div className="flex flex-row items-center justify-center uppercase">
                    <FaTag className="mr-2" />
                    <h1>Cupom de desconto</h1>
                  </div>
                  <div className="flex items-center justify-center text-center p-3">
                    <p className="text-sm font-normal">
                      Possui um cupom? Informe-o abaixo para receber seu
                      desconto.
                      <br /> Caso contrário, deixe em branco.
                    </p>
                  </div>
                  <div className="flex p-4">
                    <input
                      {...register('cupom')}
                      type="text"
                      id="cupom"
                      className="px-4 py-2 w-52 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-4 border-black rounded-l-lg"
                      placeholder="Código do cupom..."
                    />
                    <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none hover:bg-purple-700 border-b-4 border-black rounded-r-lg text-base">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5">
                <div className="flex flex-col items-center text-xl font-bold p-2">
                  <div className="flex flex-row items-center justify-center uppercase">
                    <FaGift className="mr-2" />
                    <h1>Presente</h1>
                  </div>
                  <div className="flex items-center justify-center text-center p-3">
                    <p className="text-sm font-normal">
                      É presente? Então informe o nickname do presenteado
                      abaixo. <br /> Caso contrário, deixe em branco.
                    </p>
                  </div>
                  <div className="flex p-4">
                    <input
                      {...register('presente')}
                      type="text"
                      id="presente"
                      className="px-4 py-2 w-52 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-4 border-black rounded-l-lg"
                      placeholder="Nickname do presenteado"
                    />
                    <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none  hover:bg-purple-700 border-b-4 border-black rounded-r-lg text-base">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
                <div className='flex flex-col items-center text-xl font-bold p-2'>
                  <div className='flex flex-row items-center justify-center uppercase'>
                    <FaGift className='mr-2' />
                    <h1>GIFT CARD</h1>
                  </div>
                  <div className='flex items-center justify-center text-center p-3'>
                    <p className='text-sm font-normal'>Possui um giftcard? Resgate-o aqui.<br /> Caso contrário, deixe em branco.</p>
                  </div>
                  <div className="flex p-4">
                    <input
                      type="text"
                      id="giftcard"
                      className="px-4 py-2 w-52 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-4 border-black rounded-l-lg"
                      placeholder="Código do giftcard..."
                    />
                    <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none  hover:bg-purple-700 border-b-4 border-black rounded-r-lg text-base">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
              <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
                <div className='flex flex-col items-center text-xl font-bold p-2'>
                  <div className='flex flex-row items-center justify-center uppercase'>
                    <FaGift className='mr-2' />
                    <h1>AFILIADO</h1>
                  </div>
                  <div className='flex items-center justify-center text-center p-3'>
                    <p className='text-sm font-normal'>Possui um código de afiliado? Use-o aqui. <br /> Caso contrário, deixe em branco.</p>
                  </div>
                  <div className="flex p-4">
                    <input
                      type="text"
                      id="afiliado"
                      className="px-4 py-2 w-52 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-4 border-black rounded-l-lg"
                      placeholder="Código do afiliado..."
                    />
                    <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none  hover:bg-purple-700 border-b-4 border-black rounded-r-lg text-base">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="sm:p-2 xl:p-4 rounded-lg flex flex-col">
            <div className="bg-dark2 border-b-4 border-black rounded-lg p-4">
              <h1 className="p-1 text-xl uppercase font-bold flex flex-row items-center">
                <FaMoneyBillWave className="mr-2" />
                PAGAMENTO
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4">
              <div className="flex lg:flex-row sm:flex-col items-center lg:justify-evenly sm:justify-center p-4 text-normal">
                <h1>
                  Pagamentos via cartão de cédito, ou saldo em conta,
                  geralmente, são aprovados imediatamente. Boletos podem demorar
                  até 2 dias úteis, após o pagamento, para serem aprovados.
                </h1>
              </div>
              <button
                id="mercadopago"
                value="mercadopago"
                onClick={handlePayment}
                className={`my-6 bg-dark4 p-4 rounded-lg w-64 h-auto ${
                  paymentMethod === 'mercadopago' &&
                  'border-2 border-mercadopago bg-mercadopago bg-opacity-25'
                } cursor-pointer`}
              >
                <input
                  {...register('gateway')}
                  type="radio"
                  id="gateway"
                  name="gateway"
                  value={'mercadopago'}
                  className=""
                  onChange={handlePayment}
                />
                <img
                  className={`grayscale ${
                    paymentMethod === 'mercadopago' && 'grayscale-0'
                  } hover:grayscale-0`}
                  src="/img/mercado-pago.svg"
                />
              </button>
              <div className="p-4">
                <input
                  {...register('termos')}
                  required
                  type="checkbox"
                  className="mr-2 checkbox checkbox-primary focus:border-transparent focus:ring-0"
                />
                Li e estou ciente dos{' '}
                <a
                  className="font-bold text-roxo underline hover:text-purple-700"
                  href="/loja/termos"
                >
                  Termos de Compra
                </a>{' '}
                para os produtos que estou adquirindo.
              </div>
              <div className="p-4 mt-4 flex flex-col items-center justify-center">
                <button className="flex items-center justify-center px-4 bg-purple-500 focus:outline-none hover:bg-purple-700 border-b-4 border-black rounded-lg text-base w-64 h-12">
                  Finalizar pedido
                </button>
                <p className="text-sm mt-2 text-red-500">
                  Você precisa estar logado para continuar.
                </p>
              </div>
              <div className="text-xs">
                Seu IP {userIP ? userIP : ''} está sendo gravado por segurança.
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="mx-6 p-4 sm:mx-1 sm:p-2">
        <Payments />
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    let statusCode = { code: 200 }

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    const userIP = await apiWay
      .get('https://api.ipify.org/?format=json')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getIP', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    return {
      props: {
        statusCode,
        userIP: userIP.ip,
        manutencao
      }
    }
  } catch (e) {
    return {
      props: { statusCode: e.code }
    }
  }
}
