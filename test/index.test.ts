import BN from 'bn.js';

import * as RSV from '../src';

const deserialized = {
  r: new BN(
    '1df4e7bbad23da5e5266c2d724b5c892c9cc25cdb8a5c3371bac53013f3d527',
    'hex'
  ),
  s: new BN(
    '715136cb5e9bf1f2733885d98cebded918e80f130ec85506e2779d364dd83a8',
    'hex'
  ),
  recoveryParam: 1,
};

const serialized =
  '0x01df4e7bbad23da5e5266c2d724b5c892c9cc25cdb8a5c3371bac53013f3d5270715136cb5e9bf1f2733885d98cebded918e80f130ec85506e2779d364dd83a81c';

describe('rsv-signature', () => {
  it('exportRecoveryParam', () => {
    expect(RSV.exportRecoveryParam(0)).toEqual('1b');
    expect(RSV.exportRecoveryParam(1)).toEqual('1c');
  });
  it('importRecoveryParam', () => {
    expect(RSV.importRecoveryParam('1b')).toEqual(0);
    expect(RSV.importRecoveryParam('1c')).toEqual(1);
  });
  it('serializeSignature', () => {
    const result = RSV.serializeSignature(deserialized);
    expect(result).toEqual(serialized);
  });
  it('deserializeSignature', () => {
    const result = RSV.deserializeSignature(serialized);
    expect(result.r.toString(16)).toEqual(deserialized.r.toString(16));
    expect(result.s.toString(16)).toEqual(deserialized.s.toString(16));
    expect(result.recoveryParam).toEqual(deserialized.recoveryParam);
  });
});
