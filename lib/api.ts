import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';

export function ok(data: unknown) {
  return NextResponse.json({ success: true, data });
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function requireAuth() {
  const user = await currentUser();
  if (!user) throw new Error('UNAUTHENTICATED');
  return user;
}
