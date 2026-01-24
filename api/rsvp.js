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
    message
  } = req.body;

  if (!name || !email || !attendance || !guests) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  const payload = {
    name,
    email,
    attendance,
    guests,
    message,
    ip: req.headers['x-forwarded-for'] || 'unknown'
  };

  await fetch('https://script.google.com/a/macros/unal.edu.co/s/AKfycbzrrFlPMxwb4mbFuLHm-th26xVMsqW_m-QqLuUg2A_WkdGFosZNA9Fr3ITY6x7CxwRR/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return res.status(200).json({ message: 'Confirmación recibida' });
}
