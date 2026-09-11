# Architecture

## 1. Boundary overview

```text
┌─────────────────────────────────────────────┐
│                  CLIENT                     │
│                                             │
│  Semantic HTML → CSS → ES Modules           │
│  Accessible Service Directory               │
└──────────────────────┬──────────────────────┘
                       │ HTTP JSON
                       ▼
┌─────────────────────────────────────────────┐
│                  SERVER                     │
│                                             │
│  Node HTTP Server                           │
│  GET /api/health                            │
│  GET /api/services                           │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                  DATA                       │
│                                             │
│  server/src/data/services.js                │
└─────────────────────────────────────────────┘
```

## 2. Responsibilities

### `client/`
Owns:
- presentation
- semantic structure
- keyboard interaction
- client-side filtering
- API consumption

It must not contain server secrets or persistence credentials.

### `server/`
Owns:
- HTTP endpoints
- validation boundary
- API response format
- future authentication/authorization boundary

### `server/src/data/`
Contains starter data only. A production system would replace this with a database/repository layer.

### `test/`
Contains automated tests for server behavior.

### `docs/`
Contains architecture and audit evidence so technical decisions are reviewable.

## 3. First vertical slice

The first vertical slice is **Service Directory**.

### Request

```http
GET /api/services
```

### Response

```json
{
  "data": [
    {
      "id": 1,
      "name": "Passport Services",
      "department": "Ministry of External Affairs",
      "description": "Information about passport-related services."
    }
  ]
}
```

### Client behavior

1. Browser loads semantic page.
2. JavaScript requests `/api/services`.
3. Server returns JSON.
4. Client renders service cards.
5. Search filters the already-loaded collection.
6. Status text communicates result count.

## 4. Accessibility boundaries

Accessibility is treated as a cross-layer concern:

- HTML provides semantic landmarks and labels.
- CSS provides visible focus and responsive presentation.
- JavaScript preserves keyboard operation and announces dynamic status.
- Server returns predictable, machine-readable data.

## 5. Future evolution

```text
Current
  In-memory data
       ↓
Repository interface
       ↓
Database
       ↓
Authentication
       ↓
Role-based administration
       ↓
Audit logging
```

The current structure deliberately avoids coupling the client directly to a database.

## 6. Local setup

```bash
cd server
npm install
npm start
```

Open:

```text
http://localhost:3000
```

Tests:

```bash
npm test
```
