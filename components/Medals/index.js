export default function MedalsComponent({ medals }) {
  if (!medals) {
    return <></>
  }
  return (
    <div>
      {Object.keys(medals).length >= 1 && (
        <h1 className="font-bold mt-2 text-center">Medalhas</h1>
      )}
      {Object.keys(medals).length >= 1 && (
        <div className="flex flex-wrap items-center justify-center bg-dark3 rounded-lg p-2 m-1 w-full">
          {medals.map(medal => {
            return (
              <div
                className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open"
                data-tip={medal.name || medal.medal.name}
              >
                <img
                  src={medal.image || medal.medal.image}
                  alt={`Medalha: ${medal.name || medal.medal.name}`}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
