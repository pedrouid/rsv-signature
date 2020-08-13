# rsv-signature [![npm version](https://badge.fury.io/js/rsv-signature.svg)](https://badge.fury.io/js/rsv-signature)

RSV Signature Serialization

## API

```typescript
type RecoveryParam = number | null | undefined;

interface SignatureOptions {
  r: BN;
  s: BN;
  recoveryParam: RecoveryParam;
}

function exportRecoveryParam(recoveryParam: RecoveryParam): string | null;

function importRecoveryParam(v: string): number | undefined;

function serializeSignature(sig: SignatureOptions): string;

function deserializeSignature(sig: string, size = 64): SignatureOptions;
```
