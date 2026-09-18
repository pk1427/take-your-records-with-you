import { parse } from '../../format/sighting.js'

const rawBytesGateway = 'https://api.gateway.ethswarm.org/'
/** Separate reader entrypoint: input is only a raw /bytes reference, no writer state or credentials. */
export async function readSighting(reference: string) {
  const response = await fetch(new URL(`bytes/${reference}`, rawBytesGateway)) // raw bytes upload is read through raw bytes family
  if (!response.ok) throw new Error(`Could not read raw bytes record: ${response.status}`)
  return parse(new Uint8Array(await response.arrayBuffer()))
}
const reference = process.argv[2]
if (reference) console.log(JSON.stringify(await readSighting(reference), null, 2))
else console.log('Usage: npm run reader -- <raw-bytes-reference>')
