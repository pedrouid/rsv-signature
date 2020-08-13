import BN from 'bn.js';
import * as encUtils from 'enc-utils';

export type RecoveryParam = number | null | undefined;

export interface SignatureOptions {
  r: BN;
  s: BN;
  recoveryParam: RecoveryParam;
}

export function exportRecoveryParam(
  recoveryParam: RecoveryParam
): string | null {
  return typeof recoveryParam === 'number'
    ? new BN(recoveryParam).add(new BN(27)).toString(16)
    : null;
}

export function importRecoveryParam(v: string): number | undefined {
  return v.trim() ? new BN(v, 16).sub(new BN(27)).toNumber() : undefined;
}

export function serializeSignature(sig: SignatureOptions): string {
  return encUtils.addHexPrefix(
    encUtils.padLeft(sig.r.toString(16), 64) +
      encUtils.padLeft(sig.s.toString(16), 64) +
      exportRecoveryParam(sig.recoveryParam) || ''
  );
}

export function deserializeSignature(sig: string, size = 64): SignatureOptions {
  sig = encUtils.removeHexPrefix(sig);
  return {
    r: new BN(sig.substring(0, size), 'hex'),
    s: new BN(sig.substring(size, size * 2), 'hex'),
    recoveryParam: importRecoveryParam(sig.substring(size * 2, size * 2 + 2)),
  };
}
