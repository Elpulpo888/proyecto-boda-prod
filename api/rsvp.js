export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Honeypot (anti-bots)
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

  // Validaciones básicas
  if (!name || !email || !attendance || !guests) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  // Payload para Google Sheets
  const payload = {
    name,
    email,
    attendance,
    guests,
    message: message || '',
    ip: req.headers['x-forwarded-for'] || 'unknown'
  };

  try {
    const response = await fetch(
      'https://script.google.com/a/macros/unal.edu.co/s/AKfycbzrrFlPMxwb4mbFuLHm-th26xVMsqW_m-QqLuUg2A_WkdGFosZNA9Fr3ITY6x7CxwRR/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      throw new Error('Error enviando a Google Sheets');
    }

    return res.status(200).json({
      message: 'Confirmación recibida'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error interno, intenta más tarde'
    });
  }
}
