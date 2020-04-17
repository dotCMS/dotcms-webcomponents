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
    ): Promise<any> {
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
                        console.log(`${files.length} --- ${filesCreated}`);
                        updateCallback(files.length, filesCreated++);
                        return response;
                    })
                    .catch(e => e)
            );
        });

        return Promise.all(promises).then(async (responses: Response[]) => {
            const errors: DotHttpErrorFileResponse[] = [];
            responses.forEach((response: Response | DotHttpErrorFileResponse, $index: number) => {
                if (response.status !== 200) {
                    errors.push({
                        message:
                            (response as DotHttpErrorResponse).message ||
                            fallbackErrorMessages[response.status],
                        status: response.status,
                        fileName: files[$index].fileName
                    });
                }
            });
            if (errors.length) {
                throw errors;
            } else {
                return responses;
            }
        });
    }
}
