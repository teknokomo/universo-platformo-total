export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function validateRequired(
  data: Record<string, unknown>,
  fields: string[]
): string[] {
  const missing: string[] = [];
  for (const field of fields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      missing.push(field);
    }
  }
  return missing;
}
