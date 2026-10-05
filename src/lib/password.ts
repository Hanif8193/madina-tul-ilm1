import "server-only";

import bcrypt from "bcryptjs";

/**
 * bcrypt helpers for password storage.
 *
 * Both functions are server-only, and neither ever logs, returns, or embeds the
 * plaintext it is given. The only value that leaves this module is the hash.
 */

/**
 * Lower bound on the work factor for newly created hashes.
 *
 * This is a *floor*, not a fixed cost. `hashPassword()` reuses the cost already
 * recorded in a user's existing hash, so an account created with a higher cost
 * than this is never silently downgraded by a later password change. The value
 * only decides the cost for a hash being created from scratch, and matches the
 * cost prisma/seed.ts uses when it bootstraps the first admin.
 */
export const BCRYPT_COST = 12;

/**
 * Upper bound applied when reusing a stored cost.
 *
 * bcrypt accepts costs far above this, and honouring a pathological one would let
 * a single stored value make password changes take minutes — a cheap
 * denial-of-service against the staff area. Capping it means an unusually strong
 * hash is re-hashed at a sane cost instead of being honoured literally.
 */
export const MAX_BCRYPT_COST = 16;

/**
 * Hashes a plaintext password.
 *
 * `existingHash` is the caller's current hash, when there is one. bcrypt records
 * its cost inside the hash string, so `getRounds()` recovers it and the same work
 * factor is applied on update.
 *
 * The recovered cost is only trusted when it is a genuine integer inside a sane
 * range. This is not defensive decoration: `getRounds()` returns `NaN` for a
 * malformed hash rather than throwing, `Math.max(BCRYPT_COST, NaN)` is `NaN`, and
 * `bcrypt.hash(password, NaN)` silently falls back to its own default of 10 — which
 * is *below* this module's floor. Validating first is what keeps a corrupt or
 * truncated hash from quietly downgrading a password.
 */
export async function hashPassword(
  plaintext: string,
  existingHash?: string | null,
): Promise<string> {
  let cost = BCRYPT_COST;

  if (existingHash) {
    let existingCost: number | undefined;

    try {
      existingCost = bcrypt.getRounds(existingHash);
    } catch {
      // Unparseable hash — keep the floor rather than failing the update.
    }

    if (existingCost !== undefined && Number.isInteger(existingCost)) {
      // Raise a cheap hash, keep a strong one, and cap the pathological ones.
      cost = Math.min(Math.max(BCRYPT_COST, existingCost), MAX_BCRYPT_COST);
    }
  }

  return bcrypt.hash(plaintext, cost);
}

/** Constant-time-ish comparison of a plaintext candidate against a stored hash. */
export async function verifyPassword(
  plaintext: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}