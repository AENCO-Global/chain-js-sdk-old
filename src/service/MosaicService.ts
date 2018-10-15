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

import { Observable, of as observableOf } from 'rxjs';
import { filter, map, mergeMap, take, toArray, first } from 'rxjs/operators';
import { AccountHttp } from '../infrastructure/AccountHttp';
import { MosaicHttp } from '../infrastructure/MosaicHttp';
import { NamespaceHttp } from '../infrastructure/NamespaceHttp';
import { Address } from '../model/account/Address';
import { MosaicInfo } from '../model/model';
import { Mosaic } from '../model/mosaic/Mosaic';
import { MosaicId } from '../model/mosaic/MosaicId';
import { MosaicAmountView } from './MosaicAmountView';
import { MosaicView } from './MosaicView';

/**
 * Mosaic service
 */
export class MosaicService {

    /**
     * Constructor
     * @param accountHttp
     * @param mosaicHttp
     * @param namespaceHttp
     */
    constructor(private readonly accountHttp: AccountHttp,
                private readonly mosaicHttp: MosaicHttp,
                private readonly namespaceHttp: NamespaceHttp) {

    }

    /**
     * Get mosaic view given mosaicIds
     * @param mosaicIds - The ids of the mosaics
     * @returns {Observable<MosaicView[]>}
     */
    mosaicsView(mosaicIds: MosaicId[]): Observable<MosaicView[]> {
        return observableOf(mosaicIds).pipe(
            mergeMap((_) => this.mosaicHttp.getMosaics(mosaicIds)),
            mergeMap((_) => _),
            mergeMap((mosaicInfo: MosaicInfo) => this.mosaicHttp.getMosaicsName([mosaicInfo.mosaicId]).pipe(map((mosaicsName) => {
                return { mosaicInfo, mosaicName: mosaicsName[0].name };
            }))),
            mergeMap((_) => this.namespaceHttp.getNamespacesName([_.mosaicInfo.namespaceId]).pipe(
                map((namespacesName) => {
                    return new MosaicView(_.mosaicInfo, namespacesName[0].name, _.mosaicName);
                }))),
            toArray());
    }

    /**
     * Get mosaic amount view given mosaic array
     * @param mosaics
     * @returns {Observable<MosaicAmountView[]>}
     */
    mosaicsAmountView(mosaics: Mosaic[]): Observable<MosaicAmountView[]> {
        return observableOf(mosaics).pipe(
            mergeMap((_) => _),
            mergeMap((mosaic: Mosaic) => this.mosaicsView([mosaic.id]).pipe(
                filter((_) => _.length !== 0),
                map<MosaicView[], MosaicAmountView>((mosaicViews) => {
                    return new MosaicAmountView(mosaicViews[0].mosaicInfo,
                        mosaicViews[0].namespaceName,
                        mosaicViews[0].mosaicName,
                        mosaic.amount);
                }),
            toArray())));
    }

    /**
     * Get balance mosaics in form of MosaicAmountViews for a given account address
     * @param address - Account address
     * @returns {Observable<MosaicAmountView[]>}
     */
    mosaicsAmountViewFromAddress(address: Address): Observable<MosaicAmountView[]> {
        return observableOf(address).pipe(
            mergeMap((_) => this.accountHttp.getAccountInfo(_)),
            mergeMap((_) => this.mosaicsAmountView(_.mosaics)));
    }
}
