const express = require('express');
const Projects = require('./data/helpers/projectModel.js');
const router = express.Router();

router.use(express.json());

//====== ENDPOINTS ======//
router.get('/', (req, res) => {
  Projects.get()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({
      error: "The projects information could not be retrieved."
    }));
});

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(404).json({
      message: "The project with the specified ID does not exist."
    }));
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    Projects.insert({ name, description })
      .then(data => {
        Projects.get()
          .then(data => res.status(201).json(data))
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "Your project could not be added"
        })
      })
  }
  else {
    res.status(400).json({
      errorMessage: "Please provide name and description fields for the project."
    })
  }
});

router.put('/:id', (req, res) => {
  const { name, description, completed } = req.body;

  if (name || description || completed)  {
    Projects.update(req.params.id, { name, description, completed })
    .then(data => {
      if (data) {
        Projects.get()
          .then(data => res.status(201).json(data))
      }
      else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        })
      }
    })
    .catch(err => res.status(400).json({
      errorMessage: "The project failed to update."
    }))
  }
  else {
    res.status(400).json({
      errorMessage: "Please provide a new name or description for the project."
    })
  }
});

router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then(data => {
      if (data) {
        Projects.get()
          .then(data => {
            res.json(data);
          })
      }
      else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        })
      }
    })
    .catch(err => res.status(500).json({
      error: "The project could not be removed"
    }));
});


module.exports = router;
