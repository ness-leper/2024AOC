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

function SimilarityScore(left:string[], right:string[]){
  const affinity:number[] = [];
  for (let x = 0; x < left.length; x++){
    const number = Number(left[x]);
    let occurence = 0;
    for (let idx = 0; idx < right.length; idx++){
      const n = Number(right[idx]);
      if (n > number)
        break;
      if (n === number){
        occurence += 1;
      }
    }
    affinity.push(number * occurence);
  }
  return affinity.reduce( (acc:number, val:number) => {
    return acc + val;
  },0);
}

(async () => {
  const { left, right } = CreateLists(await readLines("./input_a.txt"));
  const partOne = (await DistanceSpread(left, right));

  const partTwo = SimilarityScore(left, right);

  console.log(partOne);
  console.log(partTwo);
})();
