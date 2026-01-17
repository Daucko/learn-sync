import { NextResponse } from 'next/server';
import { getSession, JWTPayload } from './auth-utils';

export function ok(data: unknown) {
  return NextResponse.json({ success: true, data });
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function requireAuth(): Promise<JWTPayload> {
  const session = await getSession();
  if (!session) throw new Error('UNAUTHENTICATED');
  // Cast needed because getSession returns jose's payload type which is partial/generic
  return session as unknown as JWTPayload;
}
