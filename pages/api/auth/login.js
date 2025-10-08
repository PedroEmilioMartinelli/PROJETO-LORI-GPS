import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_PATH = path.join(process.cwd(), "data", "users.json");

function load() {
  if (!fs.existsSync(DATA_PATH)) return { users: [], profiles: {} };
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Campos obrigatórios" });
  const db = load();
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === hash);
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });
  // Demo: session token fake
  const token = crypto.createHash("md5").update(user.id + ":" + Date.now()).digest("hex");
  return res.status(200).json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email } });
}