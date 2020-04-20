import { DotCMSTempFile } from 'dotcms-models';
import { DotHttpErrorResponse } from '../../../../models/dot-http-error-response.model';
import { fallbackErrorMessages } from './dot-upload.service';
import { DotHttpErrorFileResponse } from '../../../../models/dot-http-error-file-response.model';
import { DotAssetCreateOptions } from '../../../../models/dot-asset-create-options.model';

export class DotAssetService {
    constructor() {}

    /**
     * Create DotAssets based on options passed in DotAssetCreateOptions
     * @param options
     *
     * @memberof DotAssetService
     */
    create(options: DotAssetCreateOptions): Promise<Response[] | DotHttpErrorFileResponse[]> {
        const promises = [];
        let filesCreated = 1;

        options.files.map((file: DotCMSTempFile) => {
            const data = {
                contentlet: {
                    baseType: 'dotAsset',
                    asset: file.id
                }
            };

            promises.push(
                fetch(options.url, {
                    method: 'PUT',
                    headers: {
                        Origin: window.location.hostname,
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response: Response) => {
                        options.updateCallback(filesCreated++);
                        return response;
                    })
                    .catch(e => e)
            );
        });

        return Promise.all(promises).then(async (response: Response[]) => {
            const errors: DotHttpErrorFileResponse[] = [];
            response.forEach((res: Response | DotHttpErrorFileResponse, $index: number) => {
                if (res.status !== 200) {
                    errors.push({
                        message:
                            (res as DotHttpErrorResponse).message ||
                            fallbackErrorMessages[res.status],
                        status: res.status,
                        fileName: options.files[$index].fileName
                    });
                }
            });
            if (errors.length) {
                throw errors;
            } else {
                return response;
            }
        });
    }
}
