const fs = require("fs/promises")

const files = ['rodada1.txt', 'rodada2.txt', 'rodada3.txt']

const classificacao = {}

const promises = files.map(async file => {
    const arquivo = await fs.readFile(file, {encoding: 'utf8'})
    fs.appendFile("logs.txt", `${Date()} - Leitura do arquivo de rodada ${file}\n`)

    const linhas = arquivo.split("\r\n")

    linhas.forEach(linha => {
        const times = linha.split("X")

        const time1 = times[0].substring(0,3)
        const placar1 = times[0].substring(3,4)

        const time2 = times[1].substring(1,4)
        const placar2 = times[1].substring(0,1)

        if(!classificacao[time1]){
            classificacao[time1] = 0
        }

        if(!classificacao[time2]){
            classificacao[time2] = 0
        }

        if(parseInt(placar1) > parseInt(placar2)){
            classificacao[time1] += 3
        }else if(parseInt(placar2) > parseInt(placar1)){
            classificacao[time2] += 3
        }else{
            classificacao[time1] += 1
            classificacao[time2] += 1
        }
        fs.appendFile("logs.txt", `${Date()} - inserção da pontuação do jogo ${time1} + ${time2}\n`)
    })
})

Promise.all(promises).then(async () => {
    const pontuacoes = []
    Object.keys(classificacao).forEach((key) => {
        pontuacoes.push({time : key, pontos: classificacao[key]})
    })

    pontuacoes.sort(( a, b ) => {
        if ( a.pontos < b.pontos ){
            return 1;
        }
        if ( a.pontos > b.pontos ){
            return -1;
        }
        return 0;
    })
    fs.appendFile("logs.txt", `${Date()} - Executando classificação\n`)
    

    let conteudo = ""
    pontuacoes.forEach(async (time, index) => {
        conteudo += `${index}\t${time.time}\t${time.pontos}\n`
    })

    await fs.writeFile('classificacao.txt', conteudo)
    fs.appendFile("logs.txt", `${Date()} - Geração do arquivo de classificação\n`)

    console.log("Arquivo de classificação gerado em ./classificacao.txt")
})