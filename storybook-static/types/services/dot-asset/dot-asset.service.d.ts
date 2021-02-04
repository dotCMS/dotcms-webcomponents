import { DotCMSContentlet } from 'dotcms-models';
import { DotHttpErrorResponse } from '../../models/dot-http-error-response.model';
import { DotAssetCreateOptions } from '../../models/dot-asset-create-options.model';
export declare class DotAssetService {
    constructor();
    /**
     * Create DotAssets based on options passed in DotAssetCreateOptions
     * @param options
     *
     * @memberof DotAssetService
     */
    create(options: DotAssetCreateOptions): Promise<DotCMSContentlet[] | DotHttpErrorResponse[]>;
}
