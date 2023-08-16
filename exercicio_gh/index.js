const axios = require('axios')

// Buscar informações sobre 03 perfis no github
// e mostrar um resumo em tela de cada perfil após a consulta
// Promise.all
// Axios
// API GITHUB
// Utilizar async/await

const perfis = [
    "marcaosi",
    "andre-ziul",
    "wilian13"
]

const executar = async () => {
    const promessas = perfis.map(async perfil => {
        return axios.get(`https://api.github.com/users/${perfil}`)
        
    })

    const resultado = await Promise.all(promessas)

    const dadosDosPerfis = resultado.map(resposta => {
        return {
            // login
            usuario: resposta.data.login,
            // html_url
            link: resposta.data.html_url,
            // name
            nome: resposta.data.name,
            // location
            nome: resposta.data.location,
            // public_repos
            quantidade_repositorios: resposta.data.public_repos,
            // followers
            seguidores: resposta.data.followers
        }
    })

    console.log(dadosDosPerfis)
}

executar()