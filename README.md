# ProofHire

MERN + Web3 + LLM project scaffold.

## Structure

```
proofhire/
├── client/   # React (Vite) frontend
└── server/   # Express + MongoDB backend
```

## Quick start

### Server
```bash
cd server
npm install
cp .env.example .env   # fill in your real values
npm run dev
```

### Client
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Server runs on `http://localhost:5000` by default.
Client runs on `http://localhost:5173` by default (Vite default port).

## What's included

- **Auth**: JWT-based register/login, protected route middleware, bcrypt password hashing
- **MongoDB**: Mongoose connection + a `User` model
- **AI route stub**: `/api/ai/generate` — wired to call Gemini (`gemini-2.5-flash`), just needs your `GEMINI_API_KEY` in `.env`
- **Web3 route stub**: `/api/web3/verify` — placeholder for wallet-signature verification (MetaMask / ethers.js), returns dummy response until you wire in real signature checks

## Environment variables

See `server/.env.example` and `client/.env.example` — copy each to `.env` and fill in real values. Never commit `.env` files.
