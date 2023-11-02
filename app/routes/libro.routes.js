module.exports = app => {
    const libros = require("../controllers/libro.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", libros.create);
  
    // Retrieve all Tutorials
    router.get("/", libros.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", libros.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", libros.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", libros.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", libros.delete);
  
    // Delete all Tutorials
    router.delete("/", libros.deleteAll);
  
    app.use('/api/libros', router);
  };