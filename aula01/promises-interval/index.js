function escreverTexto(quantidadePalavras){//william
    return new Promise((sucesso, erro) => {
        let texto = ""
        let i = 0
        if(quantidadePalavras > 100){
            return erro("Não consigo escrever mais que 100 palavras, minha mão dói.")
        }
        const interval = setInterval(() => {
            i++
            texto += i
            if(i > quantidadePalavras){
                clearInterval(interval)
                sucesso(texto)
            }
        }, 100)
    })
}

escreverTexto(101)
.then((texto) => {
    console.log(texto)
})//francisco
.catch((erro) => {
    
    escreverTexto(100).then((texto) => {
        console.log(texto)
        console.log(101)
    })

    
})//sabrina