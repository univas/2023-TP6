// Mapeia um cenário de teste
// Primeiro parametro é a descrição do cenário
// Segundo parametro é uma função que será executada
test("Iniciando com Jest", () => {
    const texto = "executando teste"

    expect(texto).toBe("executando teste")
})

test("Teste com erro", () => {
    const texto = "executando teste"

    // expect(texto).toBe("executando teste errado")
})



// TESTES DA API DE USUÁRIOS



const axios = require("axios")
const urlBase = "http://localhost:3124/"

// Cenário em que eu busco todos os usuários
test("Buscando usuários", async () => {
    const resultado = await axios.get(`${urlBase}usuarios`)

    // Verifico se o status code é 200
    expect(resultado.status).toBe(200) // asserção

    // Verifico se o retorno é um array
    expect(Array.isArray(resultado.data)).toBe(true)
})

// Cenário para buscar um único usuário
test("Buscando um usuário", async () => {
    const resultado = await axios.get(`${urlBase}usuarios/1`)

    expect(typeof resultado.data).toBe('object')
    expect(resultado.data.id).toBe(1)
    expect(resultado.status).toBe(200)

    // opcional testar
    expect(resultado.data.nome).toBe("marcos")
    expect(resultado.data.login).toBe("marcosantonio")
    expect(resultado.data.email).toBe("marcosantonio@univas.edu.br")
    expect(resultado.data.senha).toBeUndefined()
})

// Cadastrando um usuário
test("Cadastrando usuário", async () => {
    const usuario = {
        nome: "luiz",
        login: "luizlogin",
        senha: "luizsenha",
        email: "luiz@univas.edu.br"
    }

    const resultado = await axios.post(`${urlBase}usuarios`, usuario)

    expect(typeof resultado.data).toBe('object')
    expect(resultado.data.id).not.toBeNull()
    expect(resultado.data.id).not.toBeUndefined()
    expect(resultado.status).toBe(200)
})