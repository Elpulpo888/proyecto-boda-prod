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
    number,
    attendance,
    nameparner,
    restriccionalimentaria,
    preguntascomentarios
  } = req.body;

  // Validaciones básicas
  if (!name || !email || !attendance || !guests) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  // Payload para Google Sheets
  const payload = {
    name,
    number,
    attendance,
    nameparner,
    restriccionalimentaria: restriccionalimentaria || '',
    preguntascomentarios: preguntascomentarios || '',
    ip: req.headers['x-forwarded-for'] || 'unknown'
  };

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyh9zufkYRW1Aol88ReoADsyxlBj2PZiW0n0-Wh6Kt2eyMTZXJVLKqHYfuEaXTq-nLA/exec',
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
