import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { tools, CATEGORIES } from '../data/tools.js';
import { validateTool } from '../middleware/validate-tool.js';

// app.js mounts this router at /api/tools, so the paths below start after that:
// '/' here means /api/tools, and '/:id' means /api/tools/<some id>.
export const toolsRouter = Router();

// GET /api/tools sends every tool. This route already works.
toolsRouter.get('/', (req, res) => {
  const category = req.query.category;

  if (category === undefined) {
    return res.json({ data: tools });
  }

  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: {
        message: 'Invalid query',
        details: { category: 'category must be one of: power, hand, garden, cleaning' }
      }
    });
  }

  const matching = tools.filter((tool) => tool.category === category);
  res.json({ data: matching });
});

toolsRouter.get('/:id', (req, res) => {
  const tool = tools.find((t) => t.id === req.params.id);

  if (!tool) {
    return res.status(404).json({ error: { message: `Tool id not found: ${req.params.id}` } });
  }

  res.json({ data: tool });
});

toolsRouter.post('/', validateTool, (req, res) => {
  const tool = { id: randomUUID(), ...req.body };
  tools.push(tool);
  res.status(201).json({ data: tool });
});

toolsRouter.put('/:id', validateTool, (req, res) => {
  const tool = tools.find((t) => t.id === req.params.id);

  if (!tool) {
    return res.status(404).json({ error: { message: `Tool not found: ${req.params.id}` } });
  }

  Object.assign(tool, req.body);
  res.json({ data: tool });
});

toolsRouter.delete('/:id', (req, res) => {
  const index = tools.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: { message: `Tool not found: ${req.params.id}` } });
  }

  tools.splice(index, 1);
  res.status(204).end();
});