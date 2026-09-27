# Tool Library API

<!-- "This project is a RESTful API built with Express and Node.js for a community tool lending library, providing endpoints to list, filter, inspect, create, update, and remove tools." -->

Live: <!-- your Render address, for example https://cpan212-lab2-jane-doe.onrender.com/api/tools -->

## Run it

```bash
npm install
cp .env.example .env
npm run dev
```

The API runs at http://localhost:4000. Set `PORT` in `.env` to use a different port.

## Routes

| Method | Path | What it does |
|---|---|---|
| GET | `/api/tools` | Every tool. `?category=garden` keeps only one category |
| GET | `/api/tools/:id` | One tool, or 404 |
| POST | `/api/tools` | Create a tool (201), or 400 with the invalid fields |
| PUT | `/api/tools/:id` | Replace a tool's fields (200), 400 or 404 |
| DELETE | `/api/tools/:id` | Remove a tool (204), or 404 |

## Testing

```bash
npm run check
```

This tries every route and prints which checks pass.

## AI use

<!-- "AI Use: Used Gemini to explain Express routing and middleware concepts (like req.query, req.params, and validation logic), clarify HTTP status codes, and assist with debugging test suite outputs."" -->
