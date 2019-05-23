let r1 = 32;
let r2 = 47;

function update(digitalRiver: number) {
  return digitalRiver
    .toString()
    .split('')
    .reduce((prev: number, curr: string) => parseInt(curr) + prev, 0);
}

function sum(n: number): number {
  if (n < 10) return n;
  return (n % 10) + sum(Math.floor(n / 10));
}

do {
  if (r1 < r2) {
    r1 += sum(r1);
  } else if (r2 < r1) {
    r2 += sum(r2);
  }
} while (r1 !== r2);

console.log(r1);
