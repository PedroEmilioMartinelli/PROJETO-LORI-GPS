import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_PATH = path.join(process.cwd(), "data", "users.json");

function load() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    fs.writeFileSync(DATA_PATH, JSON.stringify({ users: [], profiles: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function save(db) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2));
}

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Campos obrigatórios" });

  const db = load();
  const exists = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return res.status(409).json({ error: "E-mail já cadastrado" });

  const id = crypto.randomUUID();
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  db.users.push({ id, name, email, password: hash, createdAt: new Date().toISOString() });
  db.profiles[id] = { nome: name, telefone: "", updatedAt: new Date().toISOString() };
  save(db);
  return res.status(201).json({ ok: true, id, name, email });
}