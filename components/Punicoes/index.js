import { FaClock } from "react-icons/fa";
import PunicaoInfo from "./PunicaoInfo";
import PunicaoRevogada from "./PunicaoRevogada";

export default function PunicoesIndex({
    data,
    horario,
    ativo,
    id,
    nome,
    motivo,
    termino,
    autor,
    revogacao_autor,
    revogacao_motivo,
    revogacao_data,
    silenciado,
    ipban
  }) {
return (
  <div className='p-1'>
    <div className="collapse border rounded-box border-base-300 collapse-plus border-b-2 border-dark">
      <input type="checkbox" />
      <div className="collapse-title lg:text-base sm:text-xs font-medium flex lg:items-center sm:items-start lg:flex-row sm:flex-col">
        <div className="m-2 flex flex-row items-center justify-center">
          <FaClock className='mr-2 lg:text-sm sm:hidden lg:block' /> {data}
        </div>
        <div>
          <img src={`https://minotar.net/avatar/${nome}/25`} className='lg:block sm:hidden ml-1 mr-2 rounded-md'></img>
        </div>
        <div>
          <p>{nome} foi banido por {motivo}</p>
        </div>
        <div className="lg:block m-2 sm:hidden">
          <p>(#{id})</p>
        </div>
      </div>
      <div className="collapse-content flex flex-col">
      {parseInt(ativo) === 1 &&
        //PUNIÇÕES ATIVAS
        <PunicaoInfo
          motivo={motivo}
          termino={termino}
          ativo={ativo}
          revogacao_autor={revogacao_autor}
          ipban={ipban}
          silenciado={silenciado}
          data={data}
          horario={horario}
          autor={autor}
          cor={'bg-red-600'}
          opacity={true}
        />
         || parseInt(ativo) === 0 && revogacao_autor === '#expired' &&
        //PUNIÇÕES FINALIZADAS
        <PunicaoInfo
          motivo={motivo}
          termino={termino}
          ativo={ativo}
          revogacao_autor={revogacao_autor}
          ipban={ipban}
          silenciado={silenciado}
          data={data}
          horario={horario}
          autor={autor}
          cor={'bg-lime-600'}
          opacity={true}
        />
        ||
        // PUNIÇÕES REVOGADAS
        <PunicaoInfo
          motivo={motivo}
          termino={termino}
          ativo={ativo}
          revogacao_autor={revogacao_autor}
          ipban={ipban}
          silenciado={silenciado}
          data={data}
          horario={horario}
          autor={autor}
          cor={'bg-dark2'}
          opacity={false}
        />
        }
        { // REVOGAÇÃO
        parseInt(ativo) !== 1 && revogacao_autor !== '#expired' &&
          <PunicaoRevogada
            revogacao_autor={revogacao_autor}
            revogacao_motivo={revogacao_motivo}
            revogacao_data={revogacao_data}
          />
        }
        </div>
      </div>
    </div>
  )

}
