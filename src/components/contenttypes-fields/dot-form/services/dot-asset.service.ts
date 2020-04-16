import { DotCMSTempFile } from 'dotcms-models';
import {DotHttpErrorResponse} from '../../../../models/dot-http-error-response.model';
import {fallbackErrorMessages} from './dot-upload.service';

export class DotAssetService {
    constructor() {}

    create(files: DotCMSTempFile[], url?: string): Promise<any> {
        const endPoint = url ? url : '/api/v1/workflow/actions/default/fire/NEW';
        const promises = [];

        files.forEach((file: DotCMSTempFile) => {
            const data = {
                contentlet: {
                    baseType: 'dotAsset',
                    asset: file.id
                }
            };

            promises.push(
                fetch(endPoint, {
                    method: 'PUT',
                    headers: {
                        Origin: window.location.hostname,
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(data)
                }).catch(e => e)
            );
        });

        return Promise.all(promises).then(async (responses: Response[]) => {
            const errors: DotHttpErrorResponse[] = [];
            responses.forEach((response: Response | DotHttpErrorResponse) => {
                if (response.status !== 200) {
                    errors.push({
                        message:
                            (response as DotHttpErrorResponse).message ||
                            fallbackErrorMessages[response.status],
                            status: response.status
                    });
                }
            });
            if (errors.length){
                throw errors;
            }else {
                return responses;
            }
        });
    }
}
