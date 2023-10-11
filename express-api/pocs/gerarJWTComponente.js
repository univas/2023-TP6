const crypto = require('crypto')

// Função que vai gerar o código base64 a partir de um conteúdo
function encodeBase64(content){
    return Buffer.from(content).toString('base64url')
}

// função que vai decodificar um base64 gerado anteriormente
function decodeBase64(base64){
    return Buffer.from(base64, 'base64').toString('ascii')
}

function gerarJWT(payload, secret_key){
    // criação dos dados do JWT
    let header = {
        alg: 'sha1',
        typ: 'JWT'
    }

    let signature = ""

    header = encodeBase64(JSON.stringify(header))
    payload = encodeBase64(JSON.stringify(payload))
    // criação dos dados do JWT

    const conteudoPreHash = `${header}.${payload}`

    // geração do hash que vai assinar o token
    signature = crypto.createHmac('sha1', secret_key).update(conteudoPreHash).digest('hex')
    // montagem do token com as 03 partes.
    const jwt = `${header}.${payload}.${signature}`

    // forma diferente de concatenar os textos
    const jwt2 = header + '.' + payload + '.' + signature

    return jwt
}

const jwtGerado = gerarJWT({nome: "Marcos"}, "CACHORRO")

// console.log(jwtGerado)

function validarToken(token, secret_key){
    const partesDoToken = token.split('.')

    let payload = partesDoToken[1]

    payload = JSON.parse(decodeBase64(payload))

    const tokenParaValidar = gerarJWT(payload, secret_key)

    if(tokenParaValidar == token){
        console.log("Token valido.")
    }else{
        console.log("Token invalido")
    }
}

validarToken(jwtGerado, "CACHORRO")

