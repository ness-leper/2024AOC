async function lineRead(filename: string) {
  using file = await Deno.open(filename, { read: true });
  const fileInfo = await file.stat();
  if (fileInfo.isFile) {
    const buf = new Uint8Array(1000000);
    await file.read(buf);
    const text = new TextDecoder().decode(buf);
    return text;
  }

  return "";
}

function SetReport(file: string) {
  const reports: Array<string[]> = [];
  const lines = file.split("\n");

  for (let x = 0; x < lines.length; x++) {
    const curr = lines[x].split(" ");
    if (curr.length > 1) {
      reports.push(curr);
    }
  }

  return reports;
}

function SafeReports(data: Array<string[]>) {
  let safe = 0;

  for (let x = 0; x < data.length; x++) {
    let safety = true;
    let direction = 0;
    for (let idx = 1; idx < data[x].length; idx++) {
      let check = Number(data[x][idx]) - Number(data[x][idx - 1]);
      check = check < 0 ? check * - 1 : check;
      if (check > 3) safety = false;
      if (direction === 0) {
        direction = Number(data[x][idx]) < Number(data[x][idx - 1]) ? -1 : 1;
      } else {
        if (direction === 1)
          safety =
            Number(data[x][idx]) > Number(data[x][idx - 1]) ? safety : false;
        if (direction === -1)
          safety =
            Number(data[x][idx]) < Number(data[x][idx - 1]) ? safety : false;
      }
    }
    if (safety) safe += 1;
  }

  return safe;
}

(async () => {
  const filename = "./input.txt";
  const data = SetReport(await lineRead(filename));

  const partOne = SafeReports(data);

  console.log(partOne);
})();
