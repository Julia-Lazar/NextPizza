import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' } as const;
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: 'Unsupported type' }, { status: 415 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'File too large' }, { status: 413 });

  const ext = EXT[file.type as keyof typeof EXT];
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });

  const name = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const filepath = path.join(dir, name);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  const url = `/uploads/${name}`;
  return NextResponse.json({ url, filename: name, size: file.size, contentType: file.type }, { status: 201 });
}