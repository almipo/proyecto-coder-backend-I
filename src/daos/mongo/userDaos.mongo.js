import userModel from './models/users.model.js';

class userDaosMongo {
  // Crear un nuevo usuario
  createUser = async (userData) => {
    try {
      const newUser = new userModel(userData);
      return await newUser.save();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  };

  // Obtener todos los usuarios con opciones de filtrado y paginación

  async getUsers() {
    try {
      return await this.model.find(); // Ajusta esto según tu esquema y modelo
    } catch (error) {
      throw new Error('Error al obtener usuarios: ' + error.message);
    }
  }

  // Obtener un usuario por ID
  getUserById = async (userId) => {
    try {
      return await userModel.findById(userId);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  };

  // Actualizar un usuario por ID
  updateUser = async (userId, updateData) => {
    try {
      return await userModel.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  };

  // Eliminar un usuario por ID
  deleteUser = async (userId) => {
    try {
      return await userModel.findByIdAndDelete(userId);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  };

}
export default userDaosMongo