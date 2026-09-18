/** A portable, self-describing byte format; this is the only shared writer/reader module. */
export const SIGHTING_FORMAT = 'org.deccan-birders.sighting' as const
export const SIGHTING_VERSION = 1 as const
export type Sighting = { format: typeof SIGHTING_FORMAT; version: typeof SIGHTING_VERSION; species: string; observedOn: string; place: string; observer: string; photoReference?: string }
export function encode(input: Omit<Sighting, 'format' | 'version'>): Uint8Array { return new TextEncoder().encode(JSON.stringify({ format: SIGHTING_FORMAT, version: SIGHTING_VERSION, ...input })) }
export function parse(bytes: Uint8Array): Sighting { const value = JSON.parse(new TextDecoder().decode(bytes)); if (value.format !== SIGHTING_FORMAT || value.version !== SIGHTING_VERSION) throw new Error(`Unsupported sighting format ${value.format}@${value.version}`); return value }
