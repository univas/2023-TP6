const crypto = require('crypto')

// Função que vai gerar o código base64 a partir de um conteúdo
function encodeBase64(content){
    return Buffer.from(content).toString('base64url')
}

// função que vai decodificar um base64 gerado anteriormente
function decodeBase64(base64){
    return Buffer.from(base64, 'base64').toString('ascii')
}

// criação dos dados do JWT
let header = {
    alg: 'sha1',
    typ: 'JWT'
}

let payload = {
    nome: "Marcos",
    profissao: "Professor"
}

let signature = ""

header = encodeBase64(JSON.stringify(header))
payload = encodeBase64(JSON.stringify(payload))
// criação dos dados do JWT


const secret_key = "CACHORRO"

const conteudoPreHash = `${header}.${payload}`

// geração do hash que vai assinar o token
signature = crypto.createHash('sha1', secret_key).update(conteudoPreHash).digest('hex')

// montagem do token com as 03 partes.
const jwt = `${header}.${payload}.${signature}`

// forma diferente de concatenar os textos
const jwt2 = header + '.' + payload + '.' + signature

console.log(jwt)