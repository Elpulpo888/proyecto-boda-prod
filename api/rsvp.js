export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Honeypot
  if (req.body.company) {
    return res.status(200).json({ message: 'OK' });
  }

  const {
    name,
    email,
    attendance,
    guests,
    message,
    submitted_at
  } = req.body;

  // Validaciones básicas
  if (!name || !email || !attendance || !guests) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  // Aquí luego:
  // 1. Contaremos respuestas
  // 2. Guardaremos en Google Sheets

  return res.status(200).json({
    message: 'Confirmación recibida'
  });
}
