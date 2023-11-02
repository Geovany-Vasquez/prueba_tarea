module.exports = (sequelize, Sequelize) => {
    const libros = sequelize.define("libro", {
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fechapub: {
        type: Sequelize.DATE
      }
    });
  
    return libros;
  };