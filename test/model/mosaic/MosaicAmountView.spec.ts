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
import {PublicAccount} from '../../../src/model/account/PublicAccount';
import {NetworkType} from '../../../src/model/blockchain/NetworkType';
import {MosaicAmountView} from '../../../src/service/MosaicAmountView';
import {MosaicId} from '../../../src/model/mosaic/MosaicId';
import {MosaicInfo} from '../../../src/model/mosaic/MosaicInfo';
import {MosaicProperties} from '../../../src/model/mosaic/MosaicProperties';
import {NamespaceId} from '../../../src/model/namespace/NamespaceId';
import {UInt64} from '../../../src/model/UInt64';

describe('MosaicAmountView', () => {

    let mosaicInfo: MosaicInfo;

    before(() => {
        mosaicInfo = new MosaicInfo(true, 0, '59FDA0733F17CF0001772CBC', new NamespaceId([929036875, 2226345261]),
            new MosaicId([3646934825, 3576016193]), new UInt64([3403414400, 2095475]), new UInt64([1, 0]),
            PublicAccount.createFromPublicKey('B4F12E7C9F6946091E2CB8B6D3A12B50D17CCBBF646386EA27CE2946A7423DCF', NetworkType.PUBLIC_TEST),
            MosaicProperties.create({
                supplyMutable: true,
                transferable: true,
                levyMutable: true,
                divisibility: 3,
                duration: UInt64.fromUint(1000),
            }), {});
    });

    it('should createComplete a Mosaic Amount View', () => {
        const mosaicAmountView = new MosaicAmountView(mosaicInfo, 'namespaceName', 'mosaicName', UInt64.fromUint(100));
        expect(mosaicAmountView.amount.compact()).to.be.equal(100);
        expect(mosaicAmountView.namespaceName).to.be.equal('namespaceName');
        expect(mosaicAmountView.mosaicName).to.be.equal('mosaicName');
    });

    it('should createComplete a Mosaic Amount View get relative amount', () => {
        const mosaicAmountView = new MosaicAmountView(mosaicInfo, 'namespaceName', 'mosaicName', UInt64.fromUint(100));
        expect(mosaicAmountView.relativeAmount()).to.be.equal(100 / Math.pow(10, 3));
    });

    it('should createComplete a Mosaic Amount View get correct fullName', () => {
        const mosaicAmountView = new MosaicAmountView(mosaicInfo, 'namespaceName', 'mosaicName', UInt64.fromUint(100));
        expect(mosaicAmountView.fullName()).to.be.equal('namespaceName:mosaicName');
    });
});
