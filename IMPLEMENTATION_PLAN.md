# SALESTORM Flow Lab — Implementation Plan & Milestones

A single-page architecture simulator for high-scale e-commerce flash-sale systems (10,000 customers competing for 100 units). Visualizes every route (success, failure, retry, compensation, async, bottlenecks) using React Flow and an overlay canvas particle system.

## Milestones Overview

### Milestone 1: Scaffold, Schema, Mock Architecture, Graph Auto-Layout (M1)
- [x] Vite + React 18 + TypeScript (strict) + Tailwind + Zustand + @xyflow/react setup
- [x] Tailwind & styling tokens (dark control room theme, semantic status colours)
- [x] `src/architecture/architecture.schema.ts`: Zod schema and exported TypeScript types for nodes, edges, routing rules, routes, scenarios, params, toggles
- [x] `src/architecture/mock.architecture.ts`: Complete high-level architecture with 12 layers (L0 Customers to L11 Shipment/Notification/Delivered + Workers + 12 Sinks + 14 Routes)
- [x] Export `public/examples/mock.architecture.json`
- [x] React Flow canvas with custom nodes (utilization ring, replica badge, queue bar, live status) and custom edges (live count chips, heat, dashed async)
- [x] Auto-layout calculation based on node layer, m  column alignment, and terminal sink placement
- [x] Browser verification of static diagram

### Milestone 2: Pure TypeScript Simulation Engine & Particle Layer (M2)
- [x] Pure TypeScript discrete-time simulation engine (`src/engine/`) with zero React dependencies
- [x] Entity lifecycle model with weights, idempotency keys, personas (Asha, Ravi, Meena, Karthik, Divya + dynamic personas)
- [x] Node queue processing, lognormal/exponential latency distributions, concurrency limit
- [x] Canvas particle rendering system overlaid directly on `@xyflow/react` viewport (sampling SVG edge paths, synced via viewport transform, LOD for 600+ particles, "+N" overflow chip)
- [x] Basic happy-path traversal for Hero Asha from Customers -> WAF -> LB -> Gateway -> Services -> Inventory DB -> Checkout -> Payment -> Broker -> Order -> Delivery
- [x] Browser verification of particle movement & 60fps canvas performance

### Milestone 3: Full Routing Engine, Contention, Invariants & Sinks (M3)
- [x] Routing rules evaluation engine (`when` predicates: `prob`, `stockAvailable`, `isDuplicate`, `rateLimitExceeded`, `queueFull`, `breakerOpen`, `paymentApproved`, etc.)
- [x] Authoritative inventory state machine: `{ available, reserved, sold }`
- [x] Contention and atomic reservation at Inventory DB / Redis Stock Gate with invariant enforcement
- [x] Last-item race detection and side-by-side annotation
- [x] Payment gateway circuit breaker (closed, open, half-open)
- [x] Broker queues, retries with backoff, Dead Letter Queue (DLQ), and Reconciliation Worker sweeps
- [x] All 12 terminal sink counters (Order Confirmed, Delivered, WAF blocked, Throttled 429, Out of Stock, Lock conflict, Payment declined, Timeout, Deduplicated, Expired/abandoned, 503 Load shed, In DLQ)
- [x] Real-time metrics aggregator (1s sliding window: rps, p50/p95/p99, error rates, queue depths)

### Milestone 4: Scenarios, Failure Injections & Validation Assertions (M4)
- [x] 11 Pre-scripted Scenarios (Flash sale baseline, Trace happy path, Payment declined compensation, Duplicate Buy click, Order Service downtime with DLQ & reconciliation, Out of stock, Last-item race, Expiry sweep, 50x Traffic with autoscaling, DB failover, Payment breaker)
- [x] Interactive failure injection panel (Kill node, Slow x5, Restore node)
- [x] Validation Panel checking live invariants:
  - A1: `sold <= stock` at every tick
  - A2: `available >= 0` and `available + reserved + sold == stock`
  - A3: at most 1 successful charge per idempotency key
  - A4: every PAID request eventually has an ORDER
  - A5: every reservation ends SOLD or RELEASED
  - A6: DLQ empty or fully reconciled at the end
  - A7: duplicate requests have same outcome as original
  - A8: conservation of entities (sum of sinks == total arrivals)
- [x] Real-time Bottleneck Detection & Report (top saturated nodes + explain mitigation)

### Milestone 5: Route Explorer, Follow-Hero, JSON Import, Scrubber & Tests (M5)
- [x] Route Explorer: filter by route, dim others, loop demo particles with narrated captions
- [x] Follow-Hero mode: smooth camera tracking, hero narration card, reservation & order state strip
- [x] Drag-and-drop & file upload for Architecture JSON with Zod validation errors
- [x] Bottom dashboard: SVG sparklines (arrival rate, throughput, queue depth, inventory levels) & timeline scrubber
- [x] Vitest unit & property tests: 1,000 random seeds invariant verification (`sold <= stock` and conservation A8)
- [x] Comprehensive README.md with architecture-as-data documentation and design assumptions
