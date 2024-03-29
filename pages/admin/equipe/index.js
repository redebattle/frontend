import { motion } from 'framer-motion'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { useToasts } from 'react-toast-notifications'
import Modal from 'react-modal'
import router from 'next/router'

import DashboardAsid from '../../../components/Dashboard/Aside'
import DashboardHeader from '../../../components/Dashboard/Header'
import api from '../../../service/api'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AuthContext } from '../../../contexts/AuthContext'
import ErrorDashboard from '../../../components/Dashboard/Error'
import NoPermissionDashboard from '../../../components/Dashboard/SemPermissao'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#212121'
  },
  overlay: {
    backgroundColor: 'rgba(33, 33, 33, 0.8)'
  }
}

const TableMembros = ({ id, nome, cargo, cor, cargos, twitter, discord }) => {
  const { addToast } = useToasts()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id,
      cargos
    }
  })

  const delay = (amount = 1000) =>
    new Promise(resolve => setTimeout(resolve, amount))

  async function handleExcluir(id) {
    try {
      await api.delete(`/equipe/${id}`)
      addToast('Membro excluído com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })

      closeModal2()

      await delay()

      router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha na exlusão: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }

      addToast('Erro ao excluír: ' + e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  async function handleEditar({ id, nome, cargo, cargos, twitter, discord }) {
    let cargoID
    try {
      await cargos.map(cg => {
        if (cg.nome === cargo) {
          cargoID = cg.id
        }
      })

      await api.put(`/equipe/${id}`, {
        nome,
        cargo_id: cargoID,
        twitter,
        discord
      })
      addToast('Membro editado com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })
      closeModal1()
      await delay()
      router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha ao editar: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }
      addToast('Erro ao editar: ' + e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  const [modalIsOpen1, setIsOpen1] = useState(false)
  const [modalIsOpen2, setIsOpen2] = useState(false)

  function openModal1() {
    setIsOpen1(true)
  }

  function closeModal1() {
    setIsOpen1(false)
  }

  function openModal2() {
    setIsOpen2(true)
  }

  function closeModal2() {
    setIsOpen2(false)
  }

  return (
    <tr className="bg-dark5 h-14">
      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        style={customStyles}
      >
        <div className="">
          <div className="text-gray-300 flex items-center justify-center">
            <h1 className="">Editar membro</h1>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit(handleEditar)}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Nome
                </label>
                <input
                  {...register('nome', { required: true, minLength: 3 })}
                  defaultValue={nome}
                  className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="nome"
                  type="text"
                  placeholder="Digite o nome"
                  required
                />
                {errors.nome?.type === 'required' && (
                  <span className="text-gray-300">Nome é obrigatório</span>
                )}
                {errors.name && errors.name.type === 'minLength' && (
                  <span className="text-gray-300">Nome muito curto</span>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Twitter
                </label>
                <input
                  {...register('twitter')}
                  defaultValue={twitter || null}
                  className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="twitter"
                  type="text"
                  placeholder="Digite o twitter"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Discord
                </label>
                <input
                  {...register('discord')}
                  defaultValue={discord || null}
                  className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="discord"
                  type="text"
                  placeholder="Digite o discord"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Cargo
                </label>
                <select
                  {...register('cargo')}
                  className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="select"
                >
                  <option value={cargo}>Manter cargo</option>
                  {cargos.map(cargo => {
                    return (
                      <option key={cargo.id} id={cargo.id}>
                        {cargo.nome}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Salvar
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center mt-2">
              <button
                onClick={closeModal1}
                className="bg-red-600 border-b-4 border-red-700 hover:bg-red-500 hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
      >
        <div className="">
          <div className="text-gray-300 flex items-center justify-center">
            <h1 className="text-lg">Excluir {nome}?</h1>
          </div>

          <div>
            <h1 className="text-gray-300 flex items-center justify-center p-2">
              Você tem certeza que deseja excluír este membro?
            </h1>
          </div>

          <div className="flex items-center justify-center p-5">
            <button
              onClick={() => {
                handleExcluir(id)
              }}
              className="mx-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Confirmar
            </button>
            <button
              onClick={closeModal2}
              className="mx-2 bg-red-600 border-b-4 border-red-700 hover:bg-red-500 hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
      <td className="text-gray-300 border border-dark4 text-center">
        <div className="flex items-center justify-center">
          <img
            src={
              (nome !== null && `https://minotar.net/bust/${nome}/40.png`) ||
              '/img/no-avatar.png'
            }
            className="rounded-md"
          />
        </div>
      </td>
      <td className="text-gray-300 border border-dark4 text-center">
        {nome || (
          <SkeletonTheme
            color="rgba(33, 33, 33, 0.2)"
            highlightColor="rgba(255, 255, 255, 0.3)"
          >
            <p>
              <Skeleton count={1} width={150} />
            </p>
          </SkeletonTheme>
        )}
      </td>
      <td className="text-gray-300 border border-dark4 text-center">
        <h1 style={{ color: cor }}>
          {cargo || (
            <SkeletonTheme
              color="rgba(33, 33, 33, 0.2)"
              highlightColor="rgba(255, 255, 255, 0.3)"
            >
              <p>
                <Skeleton count={1} width={150} />
              </p>
            </SkeletonTheme>
          )}
        </h1>
      </td>
      <td className="text-gray-300 border border-dark4 text-center">
        <div className="flex flex-row items-center justify-center">
          <div className="ml-1 mr-1">
            <a onClick={openModal1} className="hover:text-purple-500">
              <FaEdit />
            </a>
          </div>
          <div className="mr-1">
            <button onClick={openModal2}>
              <a className="hover:text-red-500">
                <FaTrashAlt />
              </a>
            </button>
          </div>
        </div>
      </td>
    </tr>
  )
}

const TableCargos = ({ id, cargo, cor, posicao }) => {
  const { addToast } = useToasts()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id
    }
  })

  const delay = (amount = 1000) =>
    new Promise(resolve => setTimeout(resolve, amount))

  async function handleExcluir(id) {
    try {
      await api.delete(`/cargos/${id}`)
      addToast('Cargo excluído com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })

      closeModal2()

      await delay()

      router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha na exlusão: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }

      addToast('Erro ao excluír: ' + e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  async function handleEditar({ id, nome, cargo, cor, posicao }) {
    try {
      await api.put(`/cargos/${id}`, { nome, cargo, cor, posicao })
      addToast('Cargo editado com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })
      closeModal1()
      await delay()
      router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha ao editar: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }
      addToast('Erro ao editar: ' + e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  const [modalIsOpen1, setIsOpen1] = useState(false)
  const [modalIsOpen2, setIsOpen2] = useState(false)
  function openModal1() {
    setIsOpen1(true)
  }

  function closeModal1() {
    setIsOpen1(false)
  }

  function openModal2() {
    setIsOpen2(true)
  }

  function closeModal2() {
    setIsOpen2(false)
  }
  return (
    <tr className="bg-dark5 h-14">
      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        style={customStyles}
      >
        <div className="">
          <div className="text-gray-300 flex items-center justify-center">
            <h1 className="">Editar membro</h1>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit(handleEditar)}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Nome do cargo
                </label>
                <input
                  {...register('nome', { required: true, minLength: 3 })}
                  defaultValue={cargo}
                  className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="nome"
                  type="text"
                  required
                />
                {errors.cargo?.type === 'required' && (
                  <span className="text-gray-300">Nome é obrigatório</span>
                )}
                {errors.cargo && errors.cargo.type === 'minLength' && (
                  <span className="text-gray-300">Nome muito curto</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Cor
                </label>
                <input
                  {...register('cor')}
                  defaultValue={cor}
                  className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="cor"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Posição
                </label>
                <input
                  {...register('posicao')}
                  defaultValue={posicao}
                  className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="posicao"
                  type="number"
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Salvar
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center mt-2">
              <button
                onClick={closeModal1}
                className="bg-red-600 border-b-4 border-red-700 hover:bg-red-500 hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
      >
        <div className="">
          <div className="text-gray-300 flex items-center justify-center">
            <h1 className="text-lg">Excluir {cargo}?</h1>
          </div>

          <div>
            <h1 className="text-gray-300 flex items-center justify-center p-2">
              Você tem certeza que deseja excluír este cargo?
            </h1>
          </div>

          <div className="flex items-center justify-center p-5">
            <button
              onClick={() => {
                handleExcluir(id)
              }}
              className="mx-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Confirmar
            </button>
            <button
              onClick={closeModal2}
              className="mx-2 bg-red-600 border-b-4 border-red-700 hover:bg-red-500 hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      <td className="text-gray-300 border border-dark4 text-center">{cargo}</td>
      <td className="text-gray-300 border border-dark4 text-center">
        <h1 style={{ color: cor }}>{cor}</h1>
      </td>
      <td className="text-gray-300 border border-dark4 text-center">
        {posicao}
      </td>
      <td className="text-gray-300 border border-dark4 text-center">
        <div className="flex flex-row items-center justify-center">
          <div className="ml-1 mr-1">
            <a onClick={openModal1} className="hover:text-purple-500">
              <FaEdit />
            </a>
          </div>
          <div className="mr-1">
            <button onClick={openModal2}>
              <a className="hover:text-red-500">
                <FaTrashAlt />
              </a>
            </button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default function EquipeDashboard({
  membros,
  cargos,
  error,
  possuiPermissao
}) {
  const { user } = useContext(AuthContext)
  const { addToast } = useToasts()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const delay = (amount = 1000) =>
    new Promise(resolve => setTimeout(resolve, amount))

  const [modalIsOpen1, setIsOpen1] = useState(false)
  const [modalIsOpen2, setIsOpen2] = useState(false)

  if (error) {
    return (
      <>
        <title>Equipe | Rede Battle</title>
        <ErrorDashboard active={'Equipe'} />
      </>
    )
  }

  if (!possuiPermissao) {
    return (
      <>
        <title>Equipe | Rede Battle</title>
        <NoPermissionDashboard active={'Equipe'} />
      </>
    )
  }

  function openModal1() {
    setIsOpen1(true)
  }

  function closeModal1() {
    setIsOpen1(false)
  }

  function openModal2() {
    setIsOpen2(true)
  }

  function closeModal2() {
    setIsOpen2(false)
  }

  async function handleCriarCargo({ nome, cor, posicao }) {
    try {
      await api.post('/cargos', { nome, cor, posicao })
      addToast('Cargo criado com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })

      closeModal1()

      await delay()

      router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha na criação: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }

      addToast('Erro ao criar: ' + e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  async function handleNewMember({ nome, twitter, discord, cargo }) {
    console.log('Entrou?')
    let cargoID
    try {
      await cargos.map(cg => {
        if (cg.nome === cargo) {
          cargoID = cg.id
        }
      })

      await api.post('/equipe', { nome, cargo_id: cargoID, twitter, discord })
      addToast('Membro criado com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })

      closeModal1()

      await delay()

      router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha na criação: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }

      addToast('Erro ao criar: ' + e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }
  return (
    <>
      <title>Equipe | Rede Battle</title>
      <div className="flex bg-dark2 min-h-screen">
        <DashboardAsid active="Equipe" />
        <div className="flex-grow text-gray-800">
          <DashboardHeader />
          <motion.main
            transition={{ duration: 0.3, delay: 0 }}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 15, opacity: 0 }}
            className="p-6 sm:p-10 space-y-6 bg-dark2"
          >
            <Modal
              isOpen={modalIsOpen1}
              onRequestClose={closeModal1}
              style={customStyles}
            >
              <div className="">
                <div className="text-gray-300 flex items-center justify-center">
                  <h1 className="">Criando novo cargo</h1>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit(handleCriarCargo)}>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Nome do cargo
                      </label>
                      <input
                        {...register('nome', { required: true })}
                        className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="nome"
                        type="text"
                        required
                      />
                      {errors.cargo?.type === 'required' && (
                        <span className="text-red-500">Nome é obrigatório</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Cor
                      </label>
                      <input
                        {...register('cor', { required: true })}
                        className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="cor"
                        type="text"
                      />
                      {errors.cor?.type === 'required' && (
                        <span className="text-red-500">Cor é obrigatória</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Posição
                      </label>
                      <input
                        {...register('posicao', { required: true })}
                        className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="posicao"
                        type="number"
                      />
                      {errors.posicao?.type === 'required' && (
                        <span className="text-red-500">
                          Posição é obrigatória
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Cadastrar
                      </button>
                    </div>
                  </form>
                  <div className="flex items-center justify-center mt-2">
                    <button
                      onClick={closeModal1}
                      className="bg-red-600 border-b-4 border-red-700 hover:bg-red-500 hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal
              isOpen={modalIsOpen2}
              onRequestClose={closeModal2}
              style={customStyles}
            >
              <div className="">
                <div className="text-gray-300 flex items-center justify-center">
                  <h1 className="">Adicionando novo membro</h1>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit(handleNewMember)}>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Nome
                      </label>
                      <input
                        {...register('nome', { required: true, minLength: 3 })}
                        className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="nome"
                        type="text"
                        placeholder="Digite o nome"
                        required
                      />
                      {errors.nome?.type === 'required' && (
                        <span className="text-gray-300">
                          Nome é obrigatório
                        </span>
                      )}
                      {errors.name && errors.name.type === 'minLength' && (
                        <span className="text-gray-300">Nome muito curto</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Twitter
                      </label>
                      <input
                        {...register('twitter')}
                        className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="twitter"
                        type="text"
                        placeholder="Digite o twitter"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Discord
                      </label>
                      <input
                        {...register('discord')}
                        className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="discord"
                        type="text"
                        placeholder="Digite o discord"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Cargo
                      </label>
                      <select
                        {...register('cargo')}
                        className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="select"
                      >
                        <option key="">Escolha</option>
                        {cargos.map(cargo => {
                          return (
                            <option key={cargo.id} id={cargo.id}>
                              {cargo.nome}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Adicionar
                      </button>
                    </div>
                  </form>
                  <div className="flex items-center justify-center mt-2">
                    <button
                      onClick={closeModal2}
                      className="bg-red-600 border-b-4 border-red-700 hover:bg-red-500 hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
            <section className="grid md:grid-cols-2 xl:grid-cols-2 xl:grid-rows-2 xl:grid-flow-col gap-6">
              <div className="flex flex-col md:col-span-1 md:row-span-2 bg-dark3 shadow rounded-lg">
                <div className="flex justify-between items-center px-6 py-5 font-semibold border-b border-dark5 text-gray-300">
                  Todos os membros
                  <button
                    onClick={openModal2}
                    className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Adicionar membro
                  </button>
                </div>
                <div className="p-4 flex-grow">
                  <div className="flex items-center bg-dark4 justify-center h-full px-4 py-16 text-gray-300 text-sm font-bold rounded-md">
                    <table className="table-auto w-full border-collapse border-dark5">
                      <thead>
                        <tr className="bg-dark3 h-14">
                          <th className="text-gray-300 border border-dark4">
                            <div className="flex items-center justify-center">
                              <img
                                src={
                                  'https://minotar.net/bust/connor4312/40.png'
                                }
                                className="rounded-md"
                              />
                            </div>
                          </th>
                          <th className="text-gray-300 border border-dark4">
                            Membro
                          </th>
                          <th className="text-gray-300 border border-dark4">
                            Cargo
                          </th>

                          <th className="text-gray-300 border border-dark4">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {membros.map(membro => {
                          return (
                            <TableMembros
                              key={membro.id}
                              id={membro.id}
                              nome={membro.nome}
                              cargo={membro.cargos?.nome || 'Nenhum'}
                              cor={membro.cargos?.cor}
                              cargos={cargos}
                              twitter={membro.twitter}
                              discord={membro.discord}
                            />
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:col-span-1 row-span-2 bg-dark3 shadow rounded-lg">
                <div className="flex justify-between items-center px-6 py-6 font-semibold border-b border-dark5 text-gray-300">
                  Todos os cargos
                  <button
                    onClick={openModal1}
                    className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Adicionar cargo
                  </button>
                </div>
                <div className="p-4 flex-grow">
                  <div className="flex items-center justify-center h-full px-4 py-24 text-gray-200 text-sm font-bold bg-dark4 rounded-lg">
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr className="bg-dark3 h-14">
                          <th className="text-gray-300 border border-dark4">
                            Cargo
                          </th>
                          <th className="text-gray-300 border border-dark4">
                            Cor
                          </th>
                          <th className="text-gray-300 border border-dark4">
                            #
                          </th>
                          <th className="text-gray-300 border border-dark4">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cargos.map(cargo => {
                          return (
                            <TableCargos
                              key={cargo.id}
                              id={cargo.id}
                              cargo={cargo.nome}
                              cor={cargo.cor || 'N/D'}
                              posicao={cargo.posicao}
                            />
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section className="text-center font-bold text-gray-500">
              <p className="bg-dark rounded-lg bg-opacity-30">
                © Rede Battle <br />
                Development by Filipe Moreno
              </p>
            </section>
          </motion.main>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { 'battleadmin.token': token } = await parseCookies(ctx)
  let possuiPermissao = false
  let error = false

  if (!token) {
    return {
      redirect: {
        destination: '/admin/auth/login',
        permanent: false
      }
    }
  }

  const membros = await api
    .get('/equipe/all')
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de getAllEquipe', e)
      error = true
    })

  const cargos = await api
    .get('/cargos/all')
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de getAllEquipe', e)
      error = true
    })

  const getUserRoles = await api
    .get('/roles/admin/get', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data.permissoes)
    .catch(e => {
      console.log('Ocorreu um erro ao realizar a conexão getRoles')
      error = true
    })

  getUserRoles.map(roles => {
    if (
      roles.role.nome === 'SITE.EQUIPE' ||
      roles.role.nome === 'SITE.*' ||
      roles.role.nome === '*'
    ) {
      possuiPermissao = true
    }
  })

  return {
    props: { error, membros, cargos, possuiPermissao }
  }
}
