import BN from 'bn.js';

import * as RSV from '../src';

const deserialized = {
  r: new BN(
    '3e243c5b004c89cd9c66fd1c8361c2d42226816214ac113f441027f165c6a78',
    'hex'
  ),
  s: new BN(
    'c7724575abe95602caac714cbc1e650ca3f2355e76dbb5ffb6065c194a3847',
    'hex'
  ),
  recoveryParam: 0,
};

const serialized =
  '0x03e243c5b004c89cd9c66fd1c8361c2d42226816214ac113f441027f165c6a7800c7724575abe95602caac714cbc1e650ca3f2355e76dbb5ffb6065c194a38471b';

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
