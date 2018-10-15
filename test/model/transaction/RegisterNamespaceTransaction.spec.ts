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
import {Deadline} from '../../../src/model/transaction/Deadline';
import {RegisterNamespaceTransaction} from '../../../src/model/transaction/RegisterNamespaceTransaction';
import {UInt64} from '../../../src/model/UInt64';
import {TestingAccount} from '../../conf/conf.spec';

describe('RegisterNamespaceTransaction', () => {
    let account: Account;

    before(() => {
        account = TestingAccount;
    });

    it('should createComplete an root RegisterNamespaceTransaction object and sign it', () => {
        const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
            Deadline.create(),
            'root-test-namespace',
            UInt64.fromUint(1000),
            NetworkType.PUBLIC_TEST_NET,
        );

        expect(registerNamespaceTransaction.duration!.lower).to.be.equal(1000);
        expect(registerNamespaceTransaction.duration!.higher).to.be.equal(0);

        const signedTransaction = registerNamespaceTransaction.signWith(account);

        expect(signedTransaction.payload.substring(
            240,
            signedTransaction.payload.length,
        )).to.be.equal('00E803000000000000CFCBE72D994BE61B13726F6F742D746573742D6E616D657370616365');

    });

    it('should createComplete an sub RegisterNamespaceTransaction object and sign it', () => {
        const registerNamespaceTransaction = RegisterNamespaceTransaction.createSubNamespace(
            Deadline.create(),
            'root-test-namespace',
            'parent-test-namespace',
            NetworkType.PUBLIC_TEST_NET,
        );

        const signedTransaction = registerNamespaceTransaction.signWith(account);

        expect(signedTransaction.payload.substring(
            240,
            signedTransaction.payload.length,
        )).to.be.equal('014DF55E7F6D8FB77F70BB66539D9C260613726F6F742D746573742D6E616D657370616365');

    });
});
