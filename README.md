# Deccan Birders: portable sightings

The writer uses Swarm ID browser sign-in plus the subsidised gateway. It calls `connectionInfo()` and refuses to write unless `canUpload` is true; upload errors retain the specific gateway reason. Gateway uploads are raw `/bytes`, intentionally without pin/tag or a batch ID.

The reader is a separate entrypoint and imports only the standalone `format/` contract—not writer code or state. Run `npm run reader -- <reference>` to read a shared raw bytes reference.
