import { DotCMSTempFile } from 'dotcms-models';

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
                })
            );
        });

        return Promise.all(promises);
    }
}
