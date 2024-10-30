/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {type Contract} from 'fabric-contract-api';
import {CertificateStorageContract} from './certificate_contract';

export const contracts: typeof Contract[] = [CertificateStorageContract];
