import express from 'express'
import mongoose from 'mongoose'
import Project from '../models/projectModel.js'

const router = express.Router()

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({})
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a single project by ID
router.get('/:_id', async (req, res) => {
  try {
    const project = await Project.findById(req.params._id)
    if (!project) {
      res.status(404).json({ message: 'Project not found' })
    } else {
      res.json(project)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST a new project
router.post('/CreateNewProject', async (req, res) => {
  try {
    const newProject = new Project(req.body)
    const savedProject = await newProject.save()
    res.status(201).json(savedProject)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT update project by ID
router.put('/:_id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true },
    ) // the { new: true } option returns the updated document
    if (!updatedProject) {
      res.status(404).json({ message: 'Project not found' })
    } else {
      res.json(updatedProject)
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// DELETE a project
router.delete('/:_id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params._id)
    if (!project) {
      res.status(404).json({ message: 'Project not found' })
    } else {
      res.json({ message: 'Project deleted successfully' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
