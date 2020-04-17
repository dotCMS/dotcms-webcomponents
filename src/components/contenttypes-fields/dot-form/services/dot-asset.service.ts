import { DotCMSTempFile } from 'dotcms-models';
import { DotHttpErrorResponse } from '../../../../models/dot-http-error-response.model';
import { fallbackErrorMessages } from './dot-upload.service';
import { DotHttpErrorFileResponse } from '../../../../models/dot-http-error-file-response.model';

export class DotAssetService {
    constructor() {}

    create(
        files: DotCMSTempFile[],
        updateCallback: (files, processed) => number,
        url?: string
    ): Promise<Response[] | DotHttpErrorFileResponse[]> {
        const endPoint = url ? url : '/api/v1/workflow/actions/default/fire/NEW';
        const promises = [];
        let filesCreated = 1;

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
                })
                    .then((response: Response) => {
                        updateCallback(files.length, filesCreated++);
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
                        fileName: files[$index].fileName
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
