import fs  from 'node:fs/promises'

async function readData(filePrefix: string) {
  const data = await fs.readFile( './data/' + filePrefix + '.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data: any, filePrefix: string) {
  await fs.writeFile('./data/' + filePrefix + '.json', JSON.stringify(data));
}

export {readData, writeData};