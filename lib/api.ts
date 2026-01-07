import { NextResponse } from 'next/server';
import { getSession } from './auth-utils';

export function ok(data: unknown) {
  return NextResponse.json({ success: true, data });
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error('UNAUTHENTICATED');
  return session;
}
