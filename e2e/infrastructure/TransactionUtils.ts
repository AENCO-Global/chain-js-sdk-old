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
import {ChronoUnit} from 'js-joda';
import {TransactionHttp} from '../../src/infrastructure/TransactionHttp';
import {Account} from '../../src/model/account/Account';
import {Address} from '../../src/model/account/Address';
import {NetworkType} from '../../src/model/blockchain/NetworkType';
import {XEM} from '../../src/model/mosaic/XEM';
import {AggregateTransaction} from '../../src/model/transaction/AggregateTransaction';
import {CosignatureTransaction} from '../../src/model/transaction/CosignatureTransaction';
import {Deadline} from '../../src/model/transaction/Deadline';
import {PlainMessage} from '../../src/model/transaction/PlainMessage';
import {TransferTransaction} from '../../src/model/transaction/TransferTransaction';
import {CosignatoryAccount, MultisigAccount, NIS2_URL, TestingAccount} from '../../test/conf/conf.spec';

export class TransactionUtils {

    public static createAndAnnounce(recipient: Address = Address.createFromRawAddress('SBILTA367K2LX2FEXG5TFWAS7GEFYAGY7QLFBYKC'),
                                    transactionHttp: TransactionHttp = new TransactionHttp(NIS2_URL)) {
        const account = TestingAccount;
        const transferTransaction = TransferTransaction.create(
            Deadline.create(),
            recipient,
            [],
            PlainMessage.create('test-message'),
            NetworkType.PUBLIC_TEST_NET,
        );
        const signedTransaction = account.sign(transferTransaction);
        transactionHttp.announce(signedTransaction);
    }

    public static createAndAnnounceWithInsufficientBalance(transactionHttp: TransactionHttp = new TransactionHttp(NIS2_URL)) {
        const account = TestingAccount;
        const transferTransaction = TransferTransaction.create(
            Deadline.create(),
            Address.createFromRawAddress('SBILTA367K2LX2FEXG5TFWAS7GEFYAGY7QLFBYKC'),
            [XEM.createRelative(100000000000)],
            PlainMessage.create('test-message'),
            NetworkType.PUBLIC_TEST_NET,
        );
        const signedTransaction = account.sign(transferTransaction);
        transactionHttp.announce(signedTransaction);
    }

    public static createAggregateBoundedTransactionAndAnnounce(transactionHttp: TransactionHttp = new TransactionHttp(NIS2_URL)) {
        const transferTransaction = TransferTransaction.create(
            Deadline.create(),
            Address.createFromRawAddress('SBILTA367K2LX2FEXG5TFWAS7GEFYAGY7QLFBYKC'),
            [XEM.createRelative(100000000000)],
            PlainMessage.create('test-message'),
            NetworkType.PUBLIC_TEST_NET,
        );

        const aggregateTransaction = AggregateTransaction.createBonded(
            Deadline.create(2, ChronoUnit.MINUTES),
            [transferTransaction.toAggregate(MultisigAccount.publicAccount)],
            NetworkType.PUBLIC_TEST_NET,
            [],
        );

        const signedTransaction = CosignatoryAccount.sign(aggregateTransaction);
        transactionHttp.announceAggregateBonded(signedTransaction);
    }

    public static cosignTransaction(transaction: AggregateTransaction,
                                    account: Account,
                                    transactionHttp: TransactionHttp = new TransactionHttp(NIS2_URL)) {
        const cosignatureTransaction = CosignatureTransaction.create(transaction);
        const cosignatureSignedTransaction = account.signCosignatureTransaction(cosignatureTransaction);
        transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction);
    }
}
