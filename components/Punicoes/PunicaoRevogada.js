export default function PunicaoRevogada({
  revogacao_autor,
  revogacao_motivo,
  revogacao_data
}) {
  return (
    <>
      <div className="flex lg:flex-row sm:flex-col justify-between lg:items-center sm:items-start p-4 bg-dark2 rounded-lg mt-2 border-b-2 border-dark sm:text-xs lg:text-sm">
        {revogacao_autor !== '#expired' && (
          <p className="sm:mb-3">
            Revogado por: <br />{' '}
            <div className="flex items-center mt-0.5">
              <img
                src={`https://minotar.net/avatar/${
                  revogacao_autor ? revogacao_autor : 'herobrine'
                }/25`}
                className="mr-2 rounded-md"
              ></img>
              {revogacao_autor ? revogacao_autor : 'Não informado.'}
            </div>
          </p>
        )}
        {revogacao_autor !== '#expired' && (
          <p className="sm:mb-3">
            Motivo da revogação: <br />{' '}
            {revogacao_motivo ? revogacao_motivo : 'Não informado.'}
          </p>
        )}
        {revogacao_autor !== '#expired' && (
          <p className="">
            Revogado em: <br />{' '}
            {Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }).format(new Date(revogacao_data))}{' '}
            às{' '}
            {Intl.DateTimeFormat('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            }).format(new Date(revogacao_data))}
          </p>
        )}
      </div>
    </>
  )
}
