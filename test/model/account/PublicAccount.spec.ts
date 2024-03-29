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

import { expect } from 'chai';
import { PublicAccount } from '../../../src/model/account/PublicAccount';
import { NetworkType } from '../../../src/model/blockchain/NetworkType';

describe('PublicAccount', () => {
    const publicKey = 'b4f12e7c9f6946091e2cb8b6d3a12b50d17ccbbf646386ea27ce2946a7423dcf';

    it('should createComplete a public account from public key', () => {
        const publicAccount = PublicAccount.createFromPublicKey(publicKey, NetworkType.PUBLIC_TEST);
        expect(publicAccount.publicKey).to.be.equal(publicKey);
        expect(publicAccount.address.plain()).to.be.equal('SARNASAS2BIAB6LMFA3FPMGBPGIJGK6IJETM3ZSP');
    });
});

describe('Signature verification', () => {
    it('Can verify a signature', () => {
        // Arrange:'
        const signerPublicAccount = PublicAccount.createFromPublicKey(
            '1464953393CE96A08ABA6184601FD08864E910696B060FF7064474726E666CA8',
            NetworkType.PUBLIC_TEST);
        const data = 'I am so so so awesome as always';
        const signature = '2092660F5BD4AE832B2E290F34A76B41506EE473B02FD7FD468B32C80C945CF60A0D60D005FA9B2DB3AD3212F8028C1449D3DCF81C9FAB3EB4975A7409D8D802'; // tslint:disable-line

        // Act & Assert:
        expect(signerPublicAccount.verifySignature(data, signature)).to.be.true;
    });

    it('Throw error if signature has invalid length', () => {
        // Arrange:
        const signerPublicAccount = PublicAccount.createFromPublicKey('22816F825B4CACEA334723D51297D8582332D8B875A5829908AAE85831ABB508',
            NetworkType.PUBLIC_TEST);
        const data = 'I am so so so awesome as always';
        const signature = 'B01DCA6484026C2ECDF3C822E64DEAAFC15EBCCE337EEE209C28513CB5351CDED8863A8E7B855CD471B55C91FAE611C5486'; // tslint:disable-line

        // Act & Assert:
        expect(() => { signerPublicAccount.verifySignature(data, signature); }).to.throw('Signature length is incorrect');
    });

    it('Throw error if signature is not strictly hexadecimal', () => {
        // Arrange:
        const signerPublicAccount = PublicAccount.createFromPublicKey('22816F825B4CACEA334723D51297D8582332D8B875A5829908AAE85831ABB508',
            NetworkType.PUBLIC_TEST);
        const data = 'I am so so so awesome as always';
        const signature = 'B01DCA6484026C2ECDF3C822E64DEAAFC15EBCCE337EEE209C28513CB5351CDED8863A8E7B855CD471B55C91FAE611C548625C9A5916A555A24F72F35a1wwwww';// tslint:disable-line

        // Act & Assert:
        expect(() => { signerPublicAccount.verifySignature(data, signature); })
            .to.throw('Signature must be hexadecimal only');
    });

    it('Return false if wrong public key provided', () => {
        // Arrange:
        const signerPublicAccount = PublicAccount.createFromPublicKey('12816F825B4CACEA334723D51297D8582332D8B875A5829908AAE85831ABB509',
            NetworkType.PUBLIC_TEST);
        const data = 'I am so so so awesome as always';
        const signature = 'B01DCA6484026C2ECDF3C822E64DEAAFC15EBCCE337EEE209C28513CB5351CDED8863A8E7B855CD471B55C91FAE611C548625C9A5916A555A24F72F3526FA508';// tslint:disable-line

        // Act & Assert:
        expect(signerPublicAccount.verifySignature(data, signature)).to.be.false;
    });

    it('Return false if data is not corresponding to signature provided', () => {
        // Arrange:
        const signerPublicAccount = PublicAccount.createFromPublicKey('22816F825B4CACEA334723D51297D8582332D8B875A5829908AAE85831ABB508',
            NetworkType.PUBLIC_TEST);
        const data = 'I am awesome as always';
        const signature = 'B01DCA6484026C2ECDF3C822E64DEAAFC15EBCCE337EEE209C28513CB5351CDED8863A8E7B855CD471B55C91FAE611C548625C9A5916A555A24F72F3526FA508';// tslint:disable-line

        // Act & Assert:
        expect(signerPublicAccount.verifySignature(data, signature)).to.be.false;
    });

    it('Return false if signature is not corresponding to data provided', () => {
        // Arrange:
        const signerPublicAccount = PublicAccount.createFromPublicKey('22816F825B4CACEA334723D51297D8582332D8B875A5829908AAE85831ABB508',
            NetworkType.PUBLIC_TEST);
        const data = 'I am so so so awesome as always';
        const signature = 'A01DCA6484026C2ECDF3C822E64DEAAFC15EBCCE337EEE209C28513CB5351CDED8863A8E7B855CD471B55C91FAE611C548625C9A5916A555A24F72F3526FA509';// tslint:disable-line

        // Act & Assert:
        expect(signerPublicAccount.verifySignature(data, signature)).to.be.false;
    });
});
