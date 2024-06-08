export function generateRandomUsername(name: string) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    const baseUsername = name.toLowerCase().replace(/\s+/g, ""); // Remove spaces and convert to lowercase
    return `${baseUsername}${randomSuffix}`;
  }
  