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
import {Listener} from '../../src/infrastructure/Listener';

describe('Listener', () => {
    it('should createComplete a WebSocket instance given url parameter', () => {
        const listener = new Listener('ws://localhost:3000');
        expect('ws://localhost:3000/ws').to.be.equal(listener.url);
        listener.close();
    });
});
