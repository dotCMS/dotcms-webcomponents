import { fallbackErrorMessages } from '../../components/contenttypes-fields/dot-form/services/dot-upload.service';
export class DotAssetService {
    constructor() { }
    /**
     * Create DotAssets based on options passed in DotAssetCreateOptions
     * @param options
     *
     * @memberof DotAssetService
     */
    create(options) {
        const promises = [];
        let filesCreated = 1;
        options.files.map((file) => {
            const data = {
                contentlet: {
                    baseType: 'dotAsset',
                    asset: file.id,
                    hostFolder: options.folder,
                    indexPolicy: 'WAIT_FOR'
                }
            };
            promises.push(fetch(options.url, {
                method: 'PUT',
                headers: {
                    Origin: window.location.hostname,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                options.updateCallback(filesCreated++);
                return response;
            })
                .catch(e => e));
        });
        return Promise.all(promises).then(async (response) => {
            const errors = [];
            const data = [];
            for (const res of response) {
                data.push((await res.json()).entity);
                if (res.status !== 200) {
                    let message = '';
                    try {
                        message = (await res.json()).errors[0].message;
                    }
                    catch (_a) {
                        message = fallbackErrorMessages[res.status];
                    }
                    errors.push({
                        message: message,
                        status: res.status
                    });
                }
            }
            if (errors.length) {
                throw errors;
            }
            else {
                return data;
            }
        });
    }
}
