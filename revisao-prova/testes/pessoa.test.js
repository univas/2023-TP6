const axios = require('axios')

test('Cadastrando uma pessoa', async () => {
    const pessoa = {
        nome: "Marcos",
        email: "marcosantonio@univas.edu.br"
    }

    const response = await axios.post('http://localhost:3000/pessoa', pessoa)

    expect(response.status).toBe(200)
})

test('Buscando todas as pesosas', async () => {
    const response = await axios.get('http://localhost:3000/pessoa')

    expect(response.status).toBe(200)
})

test('Buscando uma pessoa pelo id', async () => {
    const response = await axios.get('http://localhost:3000/pessoa/1')

    expect(response.status).toBe(200)
    expect(response.data.nome).toBe("Marcos")
})

test('Atualizando uma pessoa pelo id', async () => {
    const pessoa = {
        nome: "Marcos Antonio",
        email: "marcosantonio@univas.edu.br"
    }

    const response = await axios.put('http://localhost:3000/pessoa/1', pessoa)

    expect(response.status).toBe(200)
    expect(response.data.nome).toBe("Marcos Antonio")
})

test('Atualizando uma pessoa pelo id com erro', async () => {
    const pessoa = {
        email: "marcosantonio@univas.edu.br"
    }
    
    try{
        const response = await axios.put('http://localhost:3000/pessoa/1', pessoa)

        expect(response.status).toBe(400)
    }catch(err){
        expect(err.message).toBe("Request failed with status code 400")
    }
})

test('Excluindo uma pessoa pelo id', async () => {
    const response = await axios.delete('http://localhost:3000/pessoa/1')

    expect(response.status).toBe(200)
})

test('Cadastrando uma pessoa com erro de e-mail', async () => {
    const pessoa = {
        nome: "Marcos"
    }

    try{
        const response = await axios.post('http://localhost:3000/pessoa', pessoa)

        expect(response.status).toBe(400)
    }catch(err){
        expect(err.message).toBe("Request failed with status code 400")
    }
})

test('Cadastrando uma pessoa com erro de nome', async () => {
    const pessoa = {
        email: "marcosantonio@univas.edu.br"
    }

    try{
        const response = await axios.post('http://localhost:3000/pessoa', pessoa)

        expect(response.status).toBe(400)
    }catch(err){
        expect(err.message).toBe("Request failed with status code 400")
    }
})

