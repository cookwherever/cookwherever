/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Configuration, V0alpha2Api } from '@ory/kratos-client';
import { env } from '../../src/env';

const oryClient = new V0alpha2Api(
  new Configuration({
    basePath: env.KRATOS_URL,
  }),
);

export default oryClient;
