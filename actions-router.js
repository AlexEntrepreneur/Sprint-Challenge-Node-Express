const express = require('express');
const Actions = require('./data/helpers/actionModel.js');
const Projects = require('./data/helpers/projectModel.js');
const router = express.Router();

router.use(express.json());

//====== ENDPOINTS ======//
router.get('/', (req, res) => {
  Actions.get()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({
      error: "The actions information could not be retrieved."
    }));
});

router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(404).json({
      message: "The action with the specified ID does not exist."
    }));
});

router.post('/', (req, res) => {
  const { notes, description, project_id } = req.body;

  if (notes && description && project_id) {
    Projects.get(project_id)
      .then(data => {
        // If project exists then add action
        Actions.insert({ notes, description, project_id })
        .then(data => {
          Actions.get()
          .then(data => res.status(201).json(data))
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: "Your action could not be added"
          })
        })
      })
      .catch(err => res.status(404).json({
        message: "The project with the specified ID does not exist."
      }));
  }
  else {
    res.status(400).json({
      errorMessage: "Please provide notes and description fields for the action."
    })
  }
});

router.put('/:id', (req, res) => {
  const { notes, description } = req.body;;

  if (notes || description)  {
    Actions.update(req.params.id, { notes, description })
    .then(data => {
      if (data) {
        Actions.get()
          .then(data => res.status(201).json(data))
      }
      else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        })
      }
    })
    .catch(err => res.status(400).json({
      errorMessage: "The action failed to update."
    }))
  }
  else {
    res.status(400).json({
      errorMessage: "Please provide new notes or description for the action."
    })
  }
});

router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then(data => {
      if (data) {
        Actions.get()
          .then(data => {
            res.json(data);
          })
      }
      else {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        })
      }
    })
    .catch(err => res.status(500).json({
      error: "The action could not be removed"
    }));
});

module.exports = router;
