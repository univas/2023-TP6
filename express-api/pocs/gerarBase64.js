// Convertendo um conteúdo em texto para código em base64
const conteudoConvertido = Buffer.from("Um texto qualquer").toString('base64')

const conteudoConvertido2 = Buffer.from("um texto qualquer").toString('base64')

console.log(conteudoConvertido, conteudoConvertido2)


// Gerando base64 a partir de um objeto
const objeto = {
    nome: "Marcos",
    profissao: "Professor"
}
const conteudoConvertidoObjeto = Buffer.from(JSON.stringify(objeto)).toString('base64')

console.log(conteudoConvertidoObjeto)

// restaurando o conteudo de um base64
const objetoRestaurado = Buffer.from(conteudoConvertidoObjeto, 'base64').toString('ascii')

console.log(objetoRestaurado, JSON.parse(objetoRestaurado))



// gerando um base64 que pode ser enviado em URLs
const conteudoConvertidoURL = Buffer.from("Um texto qualquer").toString('base64url')

console.log(conteudoConvertidoURL)