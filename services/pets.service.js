const {Pet} = require('../db/models/pets.model')

class PetService {
  constructor() {}

  async getAllPets() {
    try {
      const rta = await Pet.findAll();
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

  async getUserPets(user_id) {
    try {
      const rta = await Pet.findAll({
        where:{
          user_id: user_id
        }
      });

      const pets = []
      rta.forEach(user => pets.push(user.toJSON()))
      return {
        statusCode: 200,
        message: "Mascotas obtenidas exitosamente",
        data: pets
      };

    } catch (error) {
      console.error(error.message)
      return {
        statusCode: 500,
        message: `Ha ocurrido un error desconocido.`
      }
    }
  }




  async createPet(data) {
    try {
      const newPet = await Pet.create(data);
      if (!newPet){
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


  async updateOnePet(id, changes) {
    try {
      const pet = await Pet.findOne({
        where:{
          id:id
        }
      });
      if (!pet){
        return {
          statusCode: 404,
          message: `La mascota con id ${id} no existe en la base de datos.`
        }
      }
      const rta =await pet.update(changes);
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



  async deletePet(id) {
   try {
    const pet = await Pet.findOne({
      where:{
        id:id
      }
    });
    if (pet === null){
      return {
        statusCode: 404,
        message: `El id ${id} no existe en la base de datos.`
      }
    }

    await pet.destroy();
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


module.exports = {PetService};