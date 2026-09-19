import { encode } from '../../format/sighting.js'

const subsidisedGatewayUrl = 'https://api.gateway.ethswarm.org/'
const form = document.querySelector<HTMLFormElement>('#sighting-form')!
const status = document.querySelector<HTMLOutputElement>('#status')!
const show = (message: string, kind = '') => { status.className = kind; status.textContent = message }

async function canUpload(endpoint: string, batchId: string): Promise<{ ok: boolean; reason?: string }> {
  if (!batchId) return { ok: true } // public subsidised gateway stamps raw bytes for a user with no batch
  try { const response = await fetch(new URL(`stamps/${batchId}`, endpoint)); if (!response.ok) return { ok: false, reason: `Batch lookup returned ${response.status}` }; const stamp = await response.json() as { usable?: boolean }; return stamp.usable ? { ok: true } : { ok: false, reason: 'This postage batch is not usable yet.' } }
  catch { return { ok: false, reason: 'Cannot reach the selected Bee endpoint.' } }
}
form.addEventListener('submit', async event => {
  event.preventDefault(); const data = new FormData(form); const endpoint = String(data.get('endpoint') || subsidisedGatewayUrl); const batchId = String(data.get('batchId') || '');
  show('Checking upload capability…'); const capability = await canUpload(endpoint, batchId)
  if (!capability.ok) return show(`Upload unavailable: ${capability.reason}`, 'error')
  try {
    const headers: Record<string, string> = batchId ? { 'Swarm-Postage-Batch-Id': batchId } : {} // no pin or tag on gateway path
    const response = await fetch(new URL('bytes', endpoint), { method: 'POST', headers, body: encode({ species: String(data.get('species')), observedOn: String(data.get('observedOn')), place: String(data.get('place')), observer: String(data.get('observer')) }) })
    if (!response.ok) throw new Error(`${response.status}: ${await response.text()}`)
    const { reference } = await response.json() as { reference: string }
    show(`Published.\n\nReference: ${reference}\n\nOpen it in the independent reader: ${location.origin}/reader.html#${reference}`, 'ok')
  } catch (error) { show(`Upload failed: ${error instanceof Error ? error.message : String(error)}`, 'error') }
})
