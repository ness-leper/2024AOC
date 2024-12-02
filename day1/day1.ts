async function readLines(filename: string) {
  using file = await Deno.open(filename, { read: true });
  const fileInfo = await file.stat();
  if (fileInfo.isFile) {
    const buf = new Uint8Array(100000);
    await file.read(buf);
    const text = new TextDecoder().decode(buf);
    return text;
  }

  return "";
}

function CreateLists(file: string) {
  const lines = file.split("\n");

  const left: string[] = [];
  const right: string[] = [];

  for (let x = 0; x < lines.length; x++) {
    const curr = lines[x].split("   ");
    if (curr.length > 1) {
      left.push(curr[0]);
      right.push(curr[1]);
    }
  }

  return { left: left.sort(), right: right.sort() };
}

async function DistanceSpread(left: string[], right: string[]) {
  let distance = 0;
  for (let x = 0; x < left.length; x++) {
    const l = Number(left[x]);
    const r = Number(right[x]);
    let temp = l - r;
    temp = temp > 0 ? temp : temp * -1;
    distance = distance + temp;
  }

  return distance;
}

(async () => {
  const { left, right } = CreateLists(await readLines("./input_a.txt"));
  console.log(await DistanceSpread(left, right));
})();
