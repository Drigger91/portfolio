---
title: "Designing an SSO microservice that never blinks"
date: 2026-05-02
blurb: "Sessions, Redis, and getting to 99.99% without heroics."
status: published
---

A partner-facing SSO service is the definition of "boring but load-bearing" — if
it blinks, every downstream journey blinks with it. Here's how the one I built at
Bajaj Finserv Health (NestJS, TypeScript, MongoDB, Redis) held **99.99% uptime**.

## Session flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Partner app
    participant S as SSO service
    participant R as Redis
    U->>P: land on partner page
    P->>S: exchange token
    S->>R: create session (TTL)
    R-->>S: ok
    S-->>P: signed session
    P-->>U: authenticated
```

The trick isn't any single component — it's making every hop **stateless except
Redis**, so any instance can serve any request and a rolling deploy never drops a
session.

More coming — this one's still getting fleshed out.
