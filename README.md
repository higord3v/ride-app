# ride-app
Nessa aplicação é possível estimar viagens, escolher opção de viagem e visualizar o histórico de viagens 

# Subir a aplicação (frontend e backend)
-- docker-compose up
-- inserir a variável GOOGLE_API_KEY={sua key} no arquivo .env

## DEFINIÇÕES DO BACKEND

    O backend é uma API Rest em NodeJS e Typescript, e terá os
    seguintes endpoints:

# POST /ride/estimate

    Responsável por receber a origem e o destino da viagem e realizar os
    cálculos dos valores da viagem.
    Esse endpoint deve fazer as seguintes validações:
    ● Os endereços de origem e destino recebidos não podem estar
    em branco.
    ● O id do usuário não pode estar em branco.
    ● Os endereços de origem e destino não podem ser o mesmo
    endereço.
    Após as validações, ele deve:
    ● Calcular a rota entre a origem e destino usando a API Routes do
    Google Maps.
    ● Com base no retorno, deve listar os motoristas disponíveis para a
    viagem de acordo com a quilometragem mínima que aceitam,
    cada um com seu respectivo valor, usando como base a

# PATCH /ride/confirm
    Responsável por confirmar a viagem e gravá-la no histórico.
    Esse endpoint deve fazer as seguintes validações:
    ● Os endereços de origem e destino recebidos não podem estar
    em branco.
    ● O id do usuário não pode estar em branco.
    ● Os endereços de origem e destino não podem ser o mesmo
    endereço.
    ● Uma opção de motorista foi informada e é uma opção válida.
    ● A quilometragem informada realmente é válida para o motorista
    selecionado.
    Após as validações ele deve:
    ● Salvar no banco de dados os dados da viagem realizada.
    Ele NÃO deve fazer:
    ● Recalcular a rota usando a API do Google Maps
    Ela irá retornar:
    ● Resposta de OK ou ERRO dependendo do valor informado.

# GET /ride/{customer_id}?driver_id={id do motorista}
    Responsável por listar as viagens realizadas por um determinado
    usuário
    Esse endpoint deve fazer as seguintes validações:
    ● O id do usuário não pode estar em branco.
    ● Se um id de motorista for informado, ele precisa ser um id válido.
    Após as validações ele:
    ● Buscar as viagens realizadas pelo usuário, ordenando da mais
    recente para a mais antiga.
    ● Pode receber um query parameter “driver_id” que, se informado,
    deve filtrar apenas as viagens realizadas pelo usuário com este
    motorista.
    Ela irá retornar:
    ● Uma lista com as viagens realizadas.
## DEFINIÇÕES DO FRONTEND
    O Frontend deverá ser uma Single Page Application em React e
    TypeScript e terá as seguintes telas:

# Solicitação de viagem
    ● Deve conter um formulário com os campos para informar o id do
    usuário, o endereço de origem e o endereço de destino e um
    botão para estimar o valor da viagem

    ● Deve fazer a requisição para a API passando os parâmetros
    necessários, ao receber a resposta deve exibir a tela de opções de
viagem

# Opções de viagem
    ● Deve mostrar um mapa estático com a rota retornada na
    estimativa plotada, indicando o ponto A e o ponto B.
    ● Deve mostrar a lista de opções de motoristas com:
        ○ nome.
        ○ descrição.
        ○ veículo.
        ○ avaliação.
        ○ valor da viagem.
    ● Para cada motorista deve ter um botão “Escolher”, que irá fazer a
    requisição para a API e confirmar a viagem.
    ● Após confirmar a viagem, deve direcionar automaticamente para
    a tela de histórico de viagens.
    Histórico de viagens
    ● Deve mostrar um campo para informar o id do usuário, um
    seletor de motorista, com uma opção para mostrar todos e um
    botão para aplicar o filtro.
    ● Ao aplicar o filtro, deve exibir a lista das viagens realizadas, com:
        ○ data e hora da viagem.
        ○ nome do motorista.
        ○ origem.
        ○ destino.
        ○ distância.
        ○ tempo.
        ○ valor.