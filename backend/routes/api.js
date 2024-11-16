const express = require('express');
const router = express.Router();

// Mock data (replace this with actual database operations later)
let forms = [];
let formResponses = {};

// Get all forms
router.get('/forms', (req, res) => {
  res.json(forms);
});

// Create a new form
router.post('/forms', (req, res) => {
  const newForm = req.body;
  newForm.id = Date.now().toString();
  forms.push(newForm);
  res.status(201).json(newForm);
});

// Get a specific form
router.get('/forms/:id', (req, res) => {
  const form = forms.find(f => f.id === req.params.id);
  if (!form) return res.status(404).json({ message: 'Form not found' });
  res.json(form);
});

// Update a form
router.put('/forms/:id', (req, res) => {
  const index = forms.findIndex(f => f.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Form not found' });
  forms[index] = { ...forms[index], ...req.body };
  res.json(forms[index]);
});

// Delete a form
router.delete('/forms/:id', (req, res) => {
  const index = forms.findIndex(f => f.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Form not found' });
  forms.splice(index, 1);
  res.status(204).send();
});

// Submit a form response
router.post('/forms/:id/submit', (req, res) => {
  const formId = req.params.id;
  if (!formResponses[formId]) formResponses[formId] = [];
  formResponses[formId].push(req.body);
  res.status(201).json({ message: 'Form submitted successfully' });
});

// Get form responses
router.get('/forms/:id/responses', (req, res) => {
  const formId = req.params.id;
  if (!formResponses[formId]) return res.json([]);
  res.json(formResponses[formId]);
});

module.exports = router;