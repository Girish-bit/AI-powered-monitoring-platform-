# Security Specification - GuardianAI

## Data Invariants
1. An Incident cannot be created without a valid userId that matches the authenticated requester.
2. The `riskLevel` must be one of the pre-defined enums.
3. Users can only read their own incident history.
4. User profiles can only be written by the owner.

## The Dirty Dozen Payloads
Below are payloads that must be rejected by Firestore rules:

1. **Identity Spoofing**: User A attempts to create an incident for User B.
2. **Invalid Enum**: Creating an incident with `riskLevel: 'APOCALYPTIC'`.
3. **Missing Required Field**: Creating a user profile without an `email`.
4. **Malicious ID**: Creating a document with a 2KB junk string as an ID.
5. **Unauthorized Read**: User B attempts to list User A's incidents.
6. **Shadow Update**: Attempting to update a user's `isVerified` status via client SDK.
7. **Type Mismatch**: Sending `confidence: "very high"` instead of a number.
8. **Resource Poisoning**: Sending a 1MB string into the `displayName` field.
9. **Timestamp Spoofing**: Sending a `createdAt` date from 2010.
10. **Orphaned Write**: Creating an incident without an existing user document (checked via exists).
11. **Blanket Read**: Querying all incidents across all users.
12. **Status Bypass**: Manually setting an incident to `RESOLVED` if that logic should be system-controlled.

## Test Runner Logic
The `firestore.rules` will be validated against these scenarios.
