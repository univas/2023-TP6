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


/**
 * Para instalar o Supertest: yarn add supertest
 * Ele pode ser usado para evitar ficar subindo a aplição toda hora
 * Ele faz por conta a execução da API, sem a intervenção humana.
 */


// TESTES DA API DE USUÁRIOS

const request = require("supertest")
const app = require("../app.js")
const controller = require("../controllers/usuarios.js")
// Cenário em que eu busco todos os usuários
// test("Buscando usuários", async () => {
//     const resultado = await axios.get(`${urlBase}usuarios`)

//     // Verifico se o status code é 200
//     expect(resultado.status).toBe(200) // asserção

//     // Verifico se o retorno é um array
//     expect(Array.isArray(resultado.data)).toBe(true)
// })
test("Buscando Usuários com Supertest", async () => {

    const response = await request(app).get("/usuarios", controller.getAll)

    console.log(response.body)
    expect(response.statusCode).toBe(200)

})



// Cadastrando um usuário
// test("Cadastrando usuário", async () => {
//     const usuario = {
//         nome: "luiz",
//         login: "luizlogin",
//         senha: "luizsenha",
//         email: "luiz@univas.edu.br"
//     }

//     const resultado = await axios.post(`${urlBase}usuarios`, usuario)

//     expect(typeof resultado.data).toBe('object')
//     expect(resultado.data.id).not.toBeNull()
//     expect(resultado.data.id).not.toBeUndefined()
//     expect(resultado.status).toBe(200)
// })
test("Cadastrando novo usuário com Supertest", async () => {
    const usuario = {
        nome: "luiz",
        login: "luizlogin",
        senha: "luizsenha",
        email: "luiz@univas.edu.br"
    }

    const response = await request(app)
                    .post("/usuarios", controller.create)
                    .send(usuario)

    expect(response.statusCode).toBe(200)
    expect(response.body.nome).toBe(usuario.nome)
    expect(response.body.login).toBe(usuario.login)
    expect(response.body.email).toBe(usuario.email)
    expect(response.body.id).toBeDefined()
})

// Cenário para buscar um único usuário
// test("Buscando um usuário", async () => {
//     const resultado = await axios.get(`${urlBase}usuarios/1`)

//     expect(typeof resultado.data).toBe('object')
//     expect(resultado.data.id).toBe(1)
//     expect(resultado.status).toBe(200)

//     // opcional testar
//     expect(resultado.data.nome).toBe("marcos")
//     expect(resultado.data.login).toBe("marcosantonio")
//     expect(resultado.data.email).toBe("marcosantonio@univas.edu.br")
//     expect(resultado.data.senha).toBeUndefined()
// })
test("Buscando um único usuário com Supertest", async () => {
    const usuario = {
        nome: "luiz",
        login: "luizlogin",
        senha: "luizsenha",
        email: "luiz@univas.edu.br"
    }

    const responseCreate = await request(app)
                    .post("/usuarios", controller.create)
                    .send(usuario)

    expect(responseCreate.statusCode).toBe(200)
    expect(responseCreate.body.nome).toBe(usuario.nome)
    expect(responseCreate.body.login).toBe(usuario.login)
    expect(responseCreate.body.email).toBe(usuario.email)
    expect(responseCreate.body.id).toBeDefined()

    const responseGet = await request(app).get(`/usuarios/${responseCreate.body.id}`, controller.getById)

    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.nome).toBe(usuario.nome)
    expect(responseGet.body.login).toBe(usuario.login)
    expect(responseGet.body.email).toBe(usuario.email)
    expect(responseGet.body.id).toBeDefined()
})


test("Excluindo um usuário com Supertest", async () => {
    const usuario = {
        nome: "luiz",
        login: "luizlogin",
        senha: "luizsenha",
        email: "luiz@univas.edu.br"
    }

    const responseCreate = await request(app)
                    .post("/usuarios", controller.create)
                    .send(usuario)

    expect(responseCreate.statusCode).toBe(200)
    expect(responseCreate.body.nome).toBe(usuario.nome)
    expect(responseCreate.body.login).toBe(usuario.login)
    expect(responseCreate.body.email).toBe(usuario.email)
    expect(responseCreate.body.id).toBeDefined()

    const responseGet = await request(app).get(`/usuarios/${responseCreate.body.id}`, controller.getById)

    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.nome).toBe(usuario.nome)
    expect(responseGet.body.login).toBe(usuario.login)
    expect(responseGet.body.email).toBe(usuario.email)
    expect(responseGet.body.id).toBeDefined()

    const responseDelete = await request(app).delete(`/usuarios/${responseCreate.body.id}`, controller.remove)

    expect(responseDelete.statusCode).toBe(200)
})

test("PUT - Atualizando um usuário com Supertest", async () => {
    const usuario = {
        nome: "luiz",
        login: "luizlogin",
        senha: "luizsenha",
        email: "luiz@univas.edu.br"
    }

    const responseCreate = await request(app)
                    .post("/usuarios", controller.create)
                    .send(usuario)

    expect(responseCreate.statusCode).toBe(200)
    expect(responseCreate.body.nome).toBe(usuario.nome)
    expect(responseCreate.body.login).toBe(usuario.login)
    expect(responseCreate.body.email).toBe(usuario.email)
    expect(responseCreate.body.id).toBeDefined()

    const usuarioDadosNovos = {
        nome: "luiz novo",
        login: "luizloginnovo",
        senha: "luizsenhanova",
        email: "luiznovo@univas.edu.br"
    }

    const responsePut = await request(app)
                        .put(`/usuarios/${responseCreate.body.id}`, controller.update)
                        .send(usuarioDadosNovos)

    expect(responsePut.statusCode).toBe(200)
    expect(responsePut.body.nome).toBe(usuarioDadosNovos.nome)
    expect(responsePut.body.login).toBe(usuarioDadosNovos.login)
    expect(responsePut.body.email).toBe(usuarioDadosNovos.email)
    expect(responsePut.body.id).toBeDefined()

    const responseGet = await request(app)
                        .get(`/usuarios/${responseCreate.body.id}`, controller.getById)

    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.nome).toBe(usuarioDadosNovos.nome)
    expect(responseGet.body.login).toBe(usuarioDadosNovos.login)
    expect(responseGet.body.email).toBe(usuarioDadosNovos.email)
    expect(responseGet.body.id).toBeDefined()

    const responseDelete = await request(app).delete(`/usuarios/${responseCreate.body.id}`, controller.remove)

    expect(responseDelete.statusCode).toBe(200)
})

test("PATCH - Atualizando um usuário com Supertest", async () => {
    const usuario = {
        nome: "luiz",
        login: "luizlogin",
        senha: "luizsenha",
        email: "luiz@univas.edu.br"
    }

    const responseCreate = await request(app)
                    .post("/usuarios", controller.create)
                    .send(usuario)

    expect(responseCreate.statusCode).toBe(200)
    expect(responseCreate.body.nome).toBe(usuario.nome)
    expect(responseCreate.body.login).toBe(usuario.login)
    expect(responseCreate.body.email).toBe(usuario.email)
    expect(responseCreate.body.id).toBeDefined()

    const usuarioDadosNovos = {
        nome: "luiznovo",
        login: "luizloginnovo"
    }

    const responsePut = await request(app)
                        .patch(`/usuarios/${responseCreate.body.id}`, controller.update)
                        .send(usuarioDadosNovos)
    console.log(responsePut.body)

    expect(responsePut.statusCode).toBe(200)
    expect(responsePut.body.nome).toBe(usuarioDadosNovos.nome)
    expect(responsePut.body.login).toBe(usuarioDadosNovos.login)
    expect(responsePut.body.email).toBe(usuario.email)
    expect(responsePut.body.id).toBeDefined()

    const responseGet = await request(app)
                        .get(`/usuarios/${responseCreate.body.id}`, controller.getById)

    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.nome).toBe(usuarioDadosNovos.nome)
    expect(responseGet.body.login).toBe(usuarioDadosNovos.login)
    expect(responseGet.body.email).toBe(usuario.email)
    expect(responseGet.body.id).toBeDefined()

    const responseDelete = await request(app).delete(`/usuarios/${responseCreate.body.id}`, controller.remove)

    expect(responseDelete.statusCode).toBe(200)
})