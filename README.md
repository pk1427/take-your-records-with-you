# Deccan Birders: portable sightings

The browser writer deliberately supports two upload routes: a subsidised public gateway when a member holds no stamp, or a member-selected Bee endpoint and usable batch. It checks the selected route before every write and returns a specific reason if it cannot upload. Gateway uploads are raw `/bytes`, intentionally without pin/tag or a batch ID.

The reader is a separately loaded `reader.html` application and imports only the standalone `format/` contract—not writer code or state. It downloads raw records through `/bytes/<reference>`, validates the embedded format/version, and renders the record. Run `npm run dev -- --host 127.0.0.1` to use the browser experience; `npm run reader -- <reference>` remains the minimal command-line reader.

See [LIVE-DEMO.md](LIVE-DEMO.md) for an actual writer-to-independent-reader interoperability proof.
