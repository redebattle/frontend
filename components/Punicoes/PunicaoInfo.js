export default function PunicaoAtiva({cor, opacity, motivo, termino, ativo, revogacao_autor, ipban, silenciado, autor, data, horario}) {
  return (
    <>
      <div className={`flex lg:flex-row sm:flex-col justify-between p-4 ${cor} ${opacity && 'bg-opacity-25'} rounded-lg border-b-2 border-black sm:text-xs lg:text-sm`}>
        <p className="sm:mb-3">Motivo: <br />{motivo}</p>
        <p className="sm:mb-3">Término: <br />{termino < 0 && <span class="badge badge-outline text-red-400 font-bold">Permanente</span>}
          {termino > 0 &&new Date(termino * 1).toLocaleDateString('pt-BR')}
        </p>
        <p className="sm:mb-3">Status: <br />{parseInt(ativo) === 0 && revogacao_autor === '#expired' && <span class="badge badge-outline text-lime-400 font-bold">Finalizado</span>}
                        {parseInt(ativo) === 0 && revogacao_autor !== '#expired' && <span class="badge badge-outline text-yellow-600 font-bold">Revogado</span>}
                        {parseInt(ativo) === 1 && <span class="badge badge-outline text-red-400 font-bold">Ativo</span>}
                        {parseInt(ipban) === 1 && <span class="badge badge-outline text-dark ml-2 font-bold">IPBan</span>}
                        {parseInt(silenciado) === 1 && <span class="badge badge-outline text-gray-500 ml-2 font-bold">Silenciado</span>}
        </p>
        <p className="sm:mb-3">Banido por: <br /><div className='flex lg:justify-between sm:justify-start items-center'><img src={`https://minotar.net/avatar/${autor}/25`} className='mr-2 rounded-md'></img>{autor}</div></p>
        <p className="">Banido em: <br />{data} às {horario}</p>
    </div>
    </>
  )
}
