const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';

function generateCode(length: number) {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (x) => alphabet[x % alphabet.length]).join('');
}

export function generateInviteCode() {
  return `ORB-${generateCode(4)}`;
}