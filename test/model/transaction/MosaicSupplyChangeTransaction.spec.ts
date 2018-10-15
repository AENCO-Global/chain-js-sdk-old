/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {expect} from 'chai';
import {Account} from '../../../src/model/account/Account';
import {NetworkType} from '../../../src/model/blockchain/NetworkType';
import {MosaicId} from '../../../src/model/mosaic/MosaicId';
import {MosaicSupplyType} from '../../../src/model/mosaic/MosaicSupplyType';
import {Deadline} from '../../../src/model/transaction/Deadline';
import {MosaicSupplyChangeTransaction,} from '../../../src/model/transaction/MosaicSupplyChangeTransaction';
import {UInt64} from '../../../src/model/UInt64';
import {TestingAccount} from '../../conf/conf.spec';

describe('MosaicSupplyChangeTransaction', () => {
    let account: Account;

    before(() => {
        account = TestingAccount;
    });

    it('should createComplete an MosaicSupplyChangeTransaction object and sign it', () => {
        const mosaicId = new MosaicId([2262289484, 3405110546]);
        const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
            Deadline.create(),
            mosaicId,
            MosaicSupplyType.Increase,
            UInt64.fromUint(10),
            NetworkType.PUBLIC_TEST_NET,
        );

        expect(mosaicSupplyChangeTransaction.direction).to.be.equal(MosaicSupplyType.Increase);
        expect(mosaicSupplyChangeTransaction.delta.lower).to.be.equal(10);
        expect(mosaicSupplyChangeTransaction.delta.higher).to.be.equal(0);
        expect(mosaicSupplyChangeTransaction.mosaicId.id.lower).to.be.equal(2262289484);
        expect(mosaicSupplyChangeTransaction.mosaicId.id.higher).to.be.equal(3405110546);

        const signedTransaction = mosaicSupplyChangeTransaction.signWith(account);

        expect(signedTransaction.payload.substring(
            240,
            signedTransaction.payload.length,
        )).to.be.equal('4CCCD78612DDF5CA010A00000000000000');

    });
});
