import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const PORT = process.env.PORT || 3001;

const VALID_SERVICES = new Set([
  'whitening',
  'braces',
  'implant',
  'filling',
  'cleaning',
  'pediatric',
  'consultation',
]);

async function readBookings() {
  try {
    return JSON.parse(await readFile(BOOKINGS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

async function saveBookings(bookings) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

function validateBooking(body) {
  const errors = [];
  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const service = String(body.service ?? '').trim();
  const date = String(body.date ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (name.length < 2 || name.length > 100) errors.push('name');
  if (!/^[0-9+\s]{8,20}$/.test(phone)) errors.push('phone');
  if (!VALID_SERVICES.has(service)) errors.push('service');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) errors.push('date');
  if (message.length > 1000) errors.push('message');

  return { errors, booking: { name, phone, service, date, message } };
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/bookings', async (req, res) => {
  const { errors, booking } = validateBooking(req.body ?? {});
  if (errors.length > 0) {
    return res.status(400).json({ error: 'invalid_fields', fields: errors });
  }

  const bookings = await readBookings();
  const record = {
    id: randomUUID(),
    ...booking,
    createdAt: new Date().toISOString(),
  };
  bookings.push(record);
  await saveBookings(bookings);

  res.status(201).json({ ok: true, id: record.id });
});

app.get('/api/bookings', async (req, res) => {
  res.json(await readBookings());
});

app.listen(PORT, () => {
  console.log(`Booking API listening on http://localhost:${PORT}`);
});
