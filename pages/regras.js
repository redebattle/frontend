import api from '../service/api'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Manutencao from '../components/Manutencao'
import Metadata from '../components/Metadata'
import ErrorAPI from '../components/ErrorAPI'

export default function Regras({ error, manutencao }) {
  // if (error) {
  //   return (
  //     <ErrorAPI />
  //   )
  // }

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  return (
    <>
      <Header />
      <title>Regras - Rede Battle</title>
      {/* ADICIONA METADATA */}
      <Metadata
        title={`Regras - Rede Battle`}
        description={`Fique por dentro das regras do servidor.`}
        /*imgURL={post.header}*/ url={`https://redebattle.com.br/regras`}
      />
      <div className="flex lg:flex-row sm:flex-col">
        <div className="bg-dark2 w-full p-4 m-6 rounded-lg border-b-4 border-black">
          <div className="p-4 m-4">
            <h1 className="font-bold text-2xl text-center mb-3">REGRAS</h1>
            <p className="text-lg m-2">
              A Rede Battle possui regras de conduta que devem ser respeitadas
              para que todos possam jogar sem chateações ou problemas em nossos
              diversos modos de jogo. Abaixo, você pode conferir todas as regras
              de nossa rede e também as punições que podem ser aplicadas caso
              você as descumpra.
            </p>
            <p className="text-sm m-2">
              Obs: A equipe é autorizada a punir todo e qualquer jogador pelo
              tempo que achar necessário, facultada a necessidade de apresentar
              provas.
            </p>
            <div className="alert alert-error">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mx-2 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  ></path>
                </svg>
                <label>
                  As regras podem ser alteradas a qualquer momento sem aviso
                  prévio, fique de olho!
                </label>
              </div>
            </div>
            <p className="text-lg m-2">
              Em nossa rede, as punições são aplicadas de forma progressiva.
              Isso significa que jogadores que cometem a mesma infração mais de
              uma vez são punidos mais severamente a cada novo episódio.
              Portanto, fique atento.
            </p>
            <p className="text-xs m-2">Última atualização: 22/01/2022</p>
          </div>
          <div className="overflow-auto h-screen scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent bg-dark3 p-4 m-4 rounded-lg border-b-4 border-black">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Abuso de Bugs</h1>
              <p className="font-extralight">
                Aproveitar-se de qualquer maneira de um erro em nossos sistemas
                para benefício próprio ou ter conhecimento de um erro e não
                reportá-lo.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Aproveitar-se de um erro de duplicação de itens.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'}1ª ocorrência: banimento de 15 dias;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'}2ª ocorrência: banimento indeterminado.
                  </p>
                  <p className="text-gray-400 text-xs">
                    <br />
                    Obs: Em caso de bugs graves, o banimento indeterminado
                    poderá ser aplicado.{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Anti-jogo</h1>
              <p className="font-extralight">
                Atitudes que podem prejudicar a jogabilidade de outros jogadores
                dentro de nossos servidores. Utilizar uma skin inapropriada e
                mentir sobre funcionalidades do servidor são algumas das
                atitudes proibidas.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Atrapalhar os próprios companheiros em modos de
                jogo coletivos.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 7 horas;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento de 15 horas;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência: banimento de 1 dia;{' '}
                  </p>
                  <p className="text-purple-600 font-normal text-lg">
                    -{'>'} 4ª ocorrência em diante: banimento de 3 dias.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Ameaça</h1>
              <p className="font-extralight">
                Realizar ameaças a outros jogadores com relação à sua pessoa,
                sua família, seus bens ou sua conta.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> "Se você não fizer isso, vou derrubar sua
                internet".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: mute de 1 dia;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento de 1 dia;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência: banimento de 3 dias;{' '}
                  </p>
                  <p className="text-purple-500 font-normal text-lg">
                    -{'>'} 4ª ocorrência em diante: banimento de 7 dias.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Comércio</h1>
              <p className="font-extralight">
                Promover comércio de itens ou contas em troca de produtos
                externos, jogos, VIPs ou dinheiro.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Troco conta por skins de CS:GO" e "Compro conta
                VIP".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 1 dia;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento de 3 dia;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência: banimento de 7 dias;{' '}
                  </p>
                  <p className="text-purple-500 font-normal text-lg">
                    -{'>'} 4ª ocorrência em diante: banimento de 15 dias.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Conta Fake</h1>
              <p className="font-extralight">
                Criar uma conta com intuito de cometer qualquer infração para
                benefício próprio ou prejuízo da rede. As punições abaixo serão
                aplicadas à sua conta principal uma vez que a conta fake será
                permanentemente punida.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Criar conta fake para abusar de um bug.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Construção Inadequada</h1>
              <p className="font-extralight">
                Fazer uma construção ofensiva ou com símbolos inapropriados em
                qualquer um dos modos de jogo da rede.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 1 dia;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento de 3 dia;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência em diante: banimento de 7 dias.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Desinformação</h1>
              <p className="font-extralight">
                Espalhar informações falsas com o intuito de prejudicar outros
                jogadores ou causar baderna geral.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> "Amanhã todos os jogadores irão receber VIP de
                graça".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: mute de 12 horas;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: mute de 1 dia;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência em diante: banimento de 3 dias;{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Divulgação</h1>
              <p className="font-extralight">
                Fazer divulgação de sites, servidores de Discord e vídeos ou
                canais em plataformas de mídia de forma comedida.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> "Entra no meu Discord: https://discord.gg/".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: mute de 12 horas;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento de 1 dia;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência: banimento de 3 dias;{' '}
                  </p>
                  <p className="text-purple-500 font-normal text-lg">
                    -{'>'} 4ª ocorrência em diante: banimento de 7 dias.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Divulgação de Servidores</h1>
              <p className="font-extralight">
                Fazer divulgação de outros servidores de Minecraft ou lojas do
                gênero como ferramenta de marketing e de captação de jogadores
                através do envio de endereços IP e links.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> "Vamos todos agora para a rede abacate! IP:
                127.0.0.1 VIP FREE".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 15 dia;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Estorno de Compra</h1>
              <p className="font-extralight">
                Tentar realizar estorno da compra de um produto adquirido em
                nossa rede através das plataformas de pagamento ou operadora de
                cartão de crédito. A tentativa já é suficiente para punição,
                sendo irrelevante se o estorno foi de fato consolidado.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Adquirir Gold, utilizar para comprar produtos e
                solicitar estorno por qualquer meio.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Falsificação de Provas</h1>
              <p className="font-extralight">
                Forjar provas com objetivo de fazer jogadores inocentes serem
                punidos de forma errada.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Usar clientes alternativos ou editores de imagem
                para criar uma situação inexistente em que outro jogador quebrou
                alguma regra.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Flood e Spam</h1>
              <p className="font-extralight">
                Enviar mensagens iguais repetidamente em curtos intervalos, se
                passar por outro jogador através do chamado 'chat fake' para
                enganar jogadores, enviar mensagens repetidas e não iguais mas
                com objetivo de poluir o chat. Incentivar outras pessoas a
                replicar qualquer uma das atitudes anteriores também causa esta
                punição.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b>
                <br />
                "Venha à minha loja"
                <br />
                "Venha à minha loja"
                <br />
                "Venha à minha loja"
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: mute de 2 horas;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: mute de 5 horas;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência: mute de 1 dia;{' '}
                  </p>
                  <p className="text-purple-500 font-normal text-lg">
                    -{'>'} 4ª ocorrência em diante: banimento de 3 dias.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Racismo e Discriminação</h1>
              <p className="font-extralight">
                Atitudes preconceituosas para com outros jogadores motivadas por
                sua raça, cor, sexo, idade ou religião e consolidadas através de
                mensagens no chat.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> "Não jogo com gente da sua cor".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 15 dias;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento de 3 meses;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Uso de Hack</h1>
              <p className="font-extralight">
                Fazer uso de clientes alternativos ou modificações que promovam
                vantagens sobre outros jogadores. As modificações permitidas
                podem ser vistas clicando aqui e qualquer modificação diferente
                pode causar sua punição.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Utilizar Kill Aura, Autoarmor, Xray e outros
                tipos de hack.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 3 meses;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Invasão de Conta</h1>
              <p className="font-extralight">
                Invadir contas de outros jogadores por quaisquer métodos.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Enganar um jogador para obter sua senha e
                invadir sua conta.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Nick Inapropriado</h1>
              <p className="font-extralight">
                Criar uma conta com nickname com mensagem sexual,
                discriminatória, ofensiva aos jogadores ou ao servidor ou com
                ataques à pessoas ou grupos.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Palavrões, partes íntimas, ofensas diretas etc.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Ofensa a Jogador</h1>
              <p className="font-extralight">
                Ofender jogadores através do chat in-game utilizando-se de
                palavrões, xingamentos, comparações ou qualquer outra forma de
                ofensa.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> "Seu filho da ****".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: mute de 5 horas;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: mute de 12 horas;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência: banimento de 1 dia;{' '}
                  </p>
                  <p className="text-purple-500 font-normal text-lg">
                    -{'>'} 4ª ocorrência em diante: banimento de 3 dias.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">
                Ofensa à Equipe ou Servidor
              </h1>
              <p className="font-extralight">
                Ofender membros da equipe de qualquer cargo ou a rede
                diretamente utilizando o chat para enviar xingamentos e
                palavrões.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> "Servidor filho da ****, mer***".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 7 dias;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento indeterminado.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Roubo</h1>
              <p className="font-extralight">
                Enganar jogadores para roubar seus coins ou itens dentro do
                servidor. Geralmente através de trocas falsas.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Fazer uma troca com um jogador e não entregar o
                item prometido.
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 5 horas;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento de 15 dias;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência em diante: banimento de 1 mês.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Time ou Aliança (Eventos)</h1>
              <p className="font-extralight">
                Aliar-se à um ou mais jogadores em modos de jogo individuais ou
                fazer aliança entre times em modos de jogo coletivos a fim de
                obter vantagem.
              </p>
              <p className="mt-2">
                <b>Exemplo:</b> Vamos fazer time para matar o Pedro".
              </p>
              <div className="collapse collapse-plus mt-2">
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  <p>Punições (Clique)</p>
                </div>
                <div className="collapse-content flex flex-col">
                  <p className="text-yellow-400 font-normal text-lg">
                    -{'>'} 1ª ocorrência: banimento de 1 horas;
                  </p>
                  <p className="text-orange-500 font-normal text-lg">
                    -{'>'} 2ª ocorrência: banimento de 3 dias;
                  </p>
                  <p className="text-red-600 font-normal text-lg">
                    -{'>'} 3ª ocorrência: banimento de 7 dias.
                  </p>
                  <p className="text-purple-500 font-normal text-lg">
                    -{'>'} 4ª ocorrência em diante: banimento de 15 dias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    let error

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return (error = true)
      })

    return {
      props: { manutencao, error: false }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
