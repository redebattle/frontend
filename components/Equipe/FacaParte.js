export default function EquipeFacaParteComponent() {
  return (
    <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 w-full p-10 rounded-lg">
      <h1 className="text-gray-300 font-bold text-xl pb-4 sm:text-center">
        Faça parte da nossa equipe!
      </h1>
      <p className="text-gray-300 pb-3 sm:text-sm lg:text-base">
        A equipe de moderação da Rede Battle é composta por <u>ajudantes</u>,{' '}
        <u>moderadores</u> e <u>administradores</u>. São voluntários
        responsáveis por manter a segurança da nossa comunidade, moderando todas
        as plataformas, como servidor, fórum, e Discord, e aplicando punições
        quando identificam que uma regra foi quebrada. Eles também colaboram com
        testes de atualizações e novos projetos.
      </p>
      <button className="mt-3 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-700 rounded-lg text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
        Saiba como aplicar para a equipe
      </button>
    </div>
  )
}
