let task = require('../models/product.js');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

router.get('/', (req, res) => {
  task.find({})
    .then(tasks => {
      res.json(tasks);
    })
    .catch(errors => {
      res.json({
        message: 'error',
        errors: errors.errors
      })
    });
});


router.post('/', (req, res) => {

  const newTask = {
    id: new mongoose.Types.ObjectId().toHexString(),
    name: req.body.name,
    category: req.body.category,
    tag: req.body.tag,
    description: req.body.description,
    dateOfTask: req.body.dateOfTask
  };

  task.create(newTask)
    .then(task => {
      res.json({
        message: 'success',
        name: task.name
      })
    })
    .catch(errors => {
      res.json({
        message: 'error',
        errors: errors.errors
      })
    });
});

router.put('/', (req, res) => {
 
  task.findOneAndUpdate({
      id: req.body.id
    }, {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      dateOfTask: req.body.dateOfTask
    })
    .then(() => {
      res.json({
        message: 'success',
        name: req.body.name
      })
    });
});

router.get('/:id', (req, res) => {
  var taskFind = task.findOne({
    id: req.params.id
  }).exec();
  taskFind.then(data => {
      res.json(data);
    })
    .catch(errors => {
      res.json({
        message: 'error',
        errors: errors.errors
      })
    });
});

router.delete('/:id', (req, res) => {
  task.deleteOne({
      id: req.params.id
    })
    .then(() => {
      res.json({
        message: 'success'
      })
    });
});

module.exports = router;