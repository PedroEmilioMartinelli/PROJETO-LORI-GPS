import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "users.json");

function load() {
  if (!fs.existsSync(DATA_PATH)) return { users: [], profiles: {} };
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function save(db) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2));
}

export default function handler(req, res) {
  const db = load();
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

  if (req.method === "GET") {
    return res.status(200).json(db.profiles[userId] || {});
  }
  if (req.method === "PUT") {
    const { nome, telefone } = req.body || {};
    db.profiles[userId] = { ...(db.profiles[userId] || {}), nome: nome || "", telefone: telefone || "", updatedAt: new Date().toISOString() };
    save(db);
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: "Método não permitido" });
}