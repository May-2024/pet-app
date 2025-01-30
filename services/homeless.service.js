const {Homeless} = require('../db/models/homeless.model')
const {Pet} = require('../db/models/pets.model')


class HomelessService {
  constructor() {}

  async getAllHomeless() {
    try {
      const rta = await Homeless.findAll();
      return {
        statusCode: 200,
        message: "Mascotas obtenidas exitosamente",
        data: rta
      };
    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }

  async getFilterHomeless(typeAnimal) {
    try {
      const rta = await Homeless.findAll({

        where:{
          animal:typeAnimal
        }
      });
      return {
        statusCode: 200,
        message: "Mascotas obtenidas exitosamente",
        data: rta
      };
    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }


  async createHomeless(data) {
    try {
      data.adopt = false;
      const newHomeless = await Homeless.create(data);
      if (!newHomeless){
        return {
          statusCode: 404,
          message: `No se pudo crear la mascota.`
        }
      }
      return {
        statusCode: 201,
        message:`La mascota fue creado exitosamente.`
      };

    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }


  async adoptHomeless(user_id, homelessId, name) {
    try {
        const homeless = await Homeless.findOne({
          // <nombre de columna en la tabla> : <la variable o parametro>
          where:{
            id:homelessId
          }
        });

        if (!homeless){
          return {
            statusCode: 404,
            message: `La mascota con id ${homelessId} no existe en la base de datos.`
          }
        }
        const rta =await homeless.update({adopt: true});
        if (!rta){
          return {
            statusCode: 500,
            message: `La mascota con
             id ${homelessId} no se pudo adoptar.`
          }
        }


        console.log(user_id)
        const HomelessToPet = await Pet.create({
          name: name,
          age: homeless.age,
          user_id: user_id
        });
        if (!HomelessToPet){
          return {
            statusCode: 500,
            message: `No se pudo crear la mascota.`
          }
        }

        return {
          statusCode: 200,
          message:`La mascota con id: ${homelessId} fue adoptado exitosamente.`
        };

        // return {
        //   statusCode: 200,
        //   message:`La mascota fue creado exitosamente.`
        // };

    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }


  async updateOneHomeless(id, changes) {
    try {
      const homeless = await Homeless.findOne({
        where:{
          id:id
        }
      });
      if (!homeless){
        return {
          statusCode: 404,
          message: `La mascota con id ${id} no existe en la base de datos.`
        }
      }
      const rta =await homeless.update(changes);
      if (!rta){
        return {
          statusCode: 500,
          message: `El id ${id} no se pudo actualizar.`
        }
      }
      return {
        statusCode: 200,
        message:`La mascota con id: ${id} fue actualizado exitosamente.`
      };

    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }



  async deleteHomeless(id) {
   try {
    const homeless = await Homeless.findOne({
      where:{
        id:id
      }
    });
    if (homeless === null){
      return {
        statusCode: 404,
        message: `El id ${id} no existe en la base de datos.`
      }
    }

    await homeless.destroy();
    return {
      statusCode: 200,
      message:`La mascota con id: ${id} fue eliminado exitosamente.`
    };

   } catch (error) {
    console.error(error.message)
    return {
      statusCode: 500,
      message: `Ha ocurrido un error desconocido.`
    }
   }
  }

}


module.exports = {HomelessService};