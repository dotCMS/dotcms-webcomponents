import { DotCMSTempFile } from 'dotcms-models';
export declare const fallbackErrorMessages: {
    500: string;
    400: string;
    401: string;
};
export declare class DotUploadService {
    constructor();
    /**
     * Will call the corresponding endpoint to upload a temporary file.
     * Return the information of tha file in the server
     * @param file
     * @param maxSize
     *
     * @memberof DotUploadService
     */
    uploadFile(file: string | File, maxSize?: string): Promise<DotCMSTempFile>;
    private uploadFileByURL;
    /**
     * Will call the temp resource endpoint to upload a temporary file.
     * With a callback to track the progress of the upload
     * Return the information of tha file(s) in the server
     * @param data
     * @param progressCallBack
     * @param maxSize
     *
     * @memberof DotUploadService
     */
    uploadBinaryFile(data: File | File[], progressCallBack?: any, maxSize?: string): Promise<DotCMSTempFile | DotCMSTempFile[]>;
    private dotRequest;
    private errorHandler;
}
