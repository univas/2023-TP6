
// Importando a biblioteca para uso
const jwt = require('jsonwebtoken')

// Gera um novo token com um payload e secrect_key enviados
const token = jwt.sign({ foo: 'bar' }, 'shhhhh')

console.log(token)

try{
    // Validando um token pela biblioteca
    const decoded = jwt.verify(token, 'shhhhhh')

    console.log(decoded)
}catch(err){
    console.log(err.message)
}