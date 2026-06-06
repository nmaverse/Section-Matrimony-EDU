# Security Specification for Section Swap Matrimony

## Data Invariants
1. A Swap Request must contain all 10 schema fields with accurate types, and a status within the specified enum values ('active', 'matched', 'completed').
2. Document ID and payloads must be validated for size limits to prevent database poisoning.

## The "Dirty Dozen" Payloads
1. Request with empty status
2. Request with ghost fields (e.g., isAdmin: true)
3. Request with excessively long name string (exceeding 128 characters)
4. Request missing required whatsapp contact details
5. Request with status outside the allowed enum set
6. Request with invalid format or type of createdAt timestamp
7. Request with non-alphanumeric special characters in the ID
8. Request with studentId as a boolean instead of string
9. Request to update an immutable field (if updates were enabled)
10. Attempt to delete and exploit resource poisoning via huge ID sizes
11. Attempt to inject nested arrays inside map values
12. Attempt to write to unmapped system resource paths

## Security Validation
Rules will strictly reject any document writes violating the standard data shape or ID character restrictions.
