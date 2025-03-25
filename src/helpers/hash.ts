import { randomBytes, createHmac } from 'crypto';

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = createHmac('sha256', salt).update(password).digest('hex');
  return `${salt}:${hash}`;
}

export function comparePassword(
  password: string,
  hash_Password: string,
): boolean {
  const [salt, storedHash] = hash_Password.split(':');
  const hash = createHmac('sha256', salt).update(password).digest('hex');
  return hash === storedHash;
}
