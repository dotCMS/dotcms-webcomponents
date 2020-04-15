import { DotCMSTempFile } from 'dotcms-models';
import { DotHttpErrorResponse } from '../../../../models/dot-http-error-response.model';

export class DotUploadService {
    constructor() {}

    /**
     * Will call the corresponding endpoint yo upload a temporary file.
     * Return the information of tha file in the server
     * @param file
     *
     * @memberof DotUploadService
     */
    uploadFile(file: string | File, maxSize?: string): Promise<DotCMSTempFile> {
        if (typeof file === 'string') {
            return this.uploadFileByURL(file);
        } else {
            return this.uploadBinaryFile(file, maxSize) as Promise<DotCMSTempFile>;
        }
    }

    private uploadFileByURL(url: string): Promise<DotCMSTempFile> {
        const UPLOAD_FILE_FROM_URL = '/api/v1/temp/byUrl';
        return fetch(UPLOAD_FILE_FROM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Origin: window.location.hostname
            },
            body: JSON.stringify({
                remoteUrl: url
            })
        }).then(async (response: Response) => {
            if (response.status === 200) {
                return (await response.json()).tempFiles[0];
            } else {
                const error: DotHttpErrorResponse = {
                    message: (await response.json()).message,
                    status: response.status
                };
                throw error;
            }
        });
    }

    uploadBinaryFile(
        data: any,
        progressCallBack?,
        context,
        maxSize?: string
    ): Promise<DotCMSTempFile | DotCMSTempFile[]> {
        let path = `/api/v1/temp`;
        path += maxSize ? `?maxFileLength=${maxSize}` : '';
        const formData = new FormData();
        if (Array.isArray(data)) {
            data.forEach((file: File) => {
                formData.append('files', file);
            });
        } else {
            formData.append('file', data);
        }

        return this.dotRequest(
            path,
            {
                method: 'POST',
                headers: {},
                body: formData
            },
            progressCallBack,
            context
        ).then(async (request: XMLHttpRequest) => {
            debugger;
            if (request.status === 200) {
                const data = JSON.parse(request.response).tempFiles;
                return data.length > 1 ? data : data[0];
            } else {
                const error: DotHttpErrorResponse = {
                    message: JSON.parse(request.response).message,
                    status: request.status
                };
                throw error;
            }
        });

        // return fetch(path, {
        //     method: 'POST',
        //     headers: {
        //         Origin: window.location.hostname
        //     },
        //     body: formData
        // }).then(async (response: Response) => {
        //     debugger;
        //     if (response.status === 200) {
        //         const data = (await response.json()).tempFiles;
        //         return data.length > 1 ? data : data[0];
        //     } else {
        //         const error: DotHttpErrorResponse = {
        //             message: (await response.json()).message,
        //             status: response.status
        //         };
        //         throw error;
        //     }
        // });
    }

    private dotRequest(url, opts, progressCallBack): Promise<any> {
        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (let [key, value] of Object.entries(opts.headers||{})) {
                xhr.setRequestHeader(key, opts.headers[key]);
                console.log(value);
            }

            // for (let k = 0; (opts.headers||[]).length < k; k++)
            xhr.onload = () => res(xhr);
            xhr.onerror = rej;
            if (xhr.upload && progressCallBack){
                xhr.upload.onprogress = (e: ProgressEvent) => {
                    const percentComplete = (e.loaded / e.total) * 100;
                    console.log("Uploaded: " + percentComplete + "%");
                    progressCallBack( percentComplete);
                };
            }
                // xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
            xhr.send(opts.body);
        });
    }
}
