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
import {NetworkType} from '../../../src/model/blockchain/NetworkType';

describe('NetworkType', () => {
    it('PUBLIC is 0x68', () => {
        expect(NetworkType.PUBLIC).to.be.equal(0x68);
        expect(NetworkType.PUBLIC).to.be.equal(104);
    });

    it('PUBLIC_TEST is 0x96', () => {
        expect(NetworkType.PUBLIC_TEST).to.be.equal(0x98);
        expect(NetworkType.PUBLIC_TEST).to.be.equal(152);
    });

    it('MIJIN is 0x60', () => {
        expect(NetworkType.MIJIN).to.be.equal(0x60);
        expect(NetworkType.MIJIN).to.be.equal(96);
    });

    it('MIJIN_TEST is 0x90', () => {
        expect(NetworkType.MIJIN_TEST).to.be.equal(0x90);
        expect(NetworkType.MIJIN_TEST).to.be.equal(144);
    });
});
