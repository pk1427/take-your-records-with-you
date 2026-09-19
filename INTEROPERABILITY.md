# Independent implementation guide

This guide is sufficient for a new reader or writer implementation. It does not depend on the Deccan Birders user interface or source code.

## Storage contract

Each sighting is UTF-8 JSON uploaded as raw Swarm bytes at `POST /bytes`. It must be retrieved as raw bytes from `GET /bytes/<reference>`; it is not a BZZ manifest and must not be fetched through `/bzz`.

Validate the decoded JSON against [`format/sighting.schema.json`](format/sighting.schema.json). An implementation must reject unknown `format` or `version` values rather than silently guessing a layout.

## Live interoperability reference

`fc0cb93e73bf75f2e5639f864e9ddb1ad5cfe3b5886859829531561cd995fb09`

This was written through a funded local Bee node and recovered by the independently loaded reader. Its details are recorded in [LIVE-DEMO.md](LIVE-DEMO.md).

## Gateway constraints

For the subsidised gateway path, send raw bytes only. Do not send `Swarm-Pin`, `Swarm-Tag`, or a postage batch header. A self-hosted Bee node may instead receive a usable `Swarm-Postage-Batch-Id` after its availability has been checked.
