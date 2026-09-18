import { encode } from '../../format/sighting.js'

const gatewayUrl = 'https://api.gateway.ethswarm.org/'
type ConnectionInfo = { canUpload: boolean; reason?: string }
/** Replace browserSignIn with SwarmIdClient sign-in in the browser UI. */
async function browserSignIn(): Promise<{ connectionInfo(): Promise<ConnectionInfo> }> { throw new Error('Open this writer through the browser UI to sign in with Swarm ID.') }
export async function fileSighting(input: { species: string; observedOn: string; place: string; observer: string }) {
  const identity = await browserSignIn()
  const connection = await identity.connectionInfo()
  if (!connection.canUpload) throw new Error(`Upload unavailable: ${connection.reason ?? 'this identity has no upload route. Sign in again or contact the gateway.'}`)
  try {
    // Subsidised gateway accepts raw bytes. No pin/tag/batch options are sent.
    const response = await fetch(new URL('bytes', gatewayUrl), { method: 'POST', body: encode(input) })
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`)
    const { reference } = await response.json() as { reference: string }
    return { reference, message: 'Sighting stored under your identity.' }
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    throw new Error(`Sighting upload failed at the subsidised gateway: ${reason}`)
  }
}
