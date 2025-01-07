
//esta es una funcion que retorna otra funcion
//estamos creando un middleware de forma dinamica
function validatorHandler(schema,property) {
  return(req,res,next) => {
    const data= req[property];
//abortEarly para que envie todos los errores a la vez
    const {error} = schema.validate(data,{abortEarly:false});
    if(error){
      console.log(`Mi bebe dice ${error.message}`)
      next(error);
    }
    next();
  }
}

module.exports = validatorHandler;
