//api prueba analisis :D
  // cristopher Isaias Tuy Yache
  //Geovany Jose Pablo Vásquez Pereira
const db = require("../models");
const libros = db.libros;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const libro = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fechapub: req.body.fechapub 
  };

  // Save Tutorial in the database
  libros.create(libro)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error al guardar libro."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const titulo = req.query.title;
  var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

  libros.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error al obtener libros"
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  libros.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `no se logra encontrar libro con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error al obtener libro con id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  libros.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "libro actualizado correctamente"
        });
      } else {
        res.send({
          message: `no se pudo actualizar libro mediante id=${id}. Maybe libro was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating libro with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  libros.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "el libro fue eliminado correctamente"
        });
      } else {
        res.send({
          message: `Cannot delete libro with id=${id}. Maybe libro was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "no se pudo borrar el libro con id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  libros.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} libros were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all libros."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  libros.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving libros."
      });
    });
};