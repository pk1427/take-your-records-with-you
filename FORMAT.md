# Deccan Birder Sighting Format

Raw Swarm `/bytes` payload, UTF-8 JSON. Every record embeds `format: "org.deccan-birders.sighting"` and `version: 1`, followed by `species`, ISO-8601 `observedOn`, human-readable `place`, `observer`, and an optional raw `/bytes` `photoReference`. Consumers must reject unknown format/version pairs rather than guess.

References are raw bytes references and must be downloaded from `/bytes/{reference}` (not `/bzz`).
