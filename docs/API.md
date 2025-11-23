# API endpoints

All endpoints return JSON in the shape `{ success: boolean, data?: any, error?: string }`.

Authentication: protected endpoints require Clerk authentication (token or session). Public `GET` list and item endpoints are readable without auth.

Collection endpoints (GET list, POST create):

- `GET /api/organization`
- `POST /api/organization`
- `GET /api/user`
- `POST /api/user`
- `GET /api/subject`
- `POST /api/subject`
- `GET /api/course`
- `POST /api/course`
- `GET /api/assignment`
- `POST /api/assignment`
- `GET /api/submission`
- `POST /api/submission`
- `GET /api/content-upload`
- `POST /api/content-upload`
- `GET /api/notification`
- `POST /api/notification`

Item endpoints (GET, PUT, DELETE):

- `GET /api/{model}/{id}`
- `PUT /api/{model}/{id}`
- `DELETE /api/{model}/{id}`

Notes & next steps

- I added basic auth checks: create/update/delete require auth. If you'd like role checks (e.g., only tutors create assignments), I can enforce them.
- I recommend adding `zod` for schema validation and updating `package.json` and installing packages.
