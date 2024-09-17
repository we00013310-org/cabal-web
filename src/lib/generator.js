export function generateNumbersInRange(x, y, z = 20) {
  const result = [];

  // Calculate the minimum and maximum boundaries based on the percentage z
  const range = y * (z / 100);
  const min = y - range;
  const max = y + range;

  // Generate x random numbers within the range
  for (let i = 1; i < x; i++) {
    // Generate a random number between min and max
    const randomNumber = Math.random() * (max - min) + min;
    result.push(randomNumber);
  }

  result.push(y);

  return result;
}
