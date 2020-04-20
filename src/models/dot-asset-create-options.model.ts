import { DotCMSTempFile } from 'dotcms-models';

export interface DotAssetCreateOptions {
    files: DotCMSTempFile[];
    updateCallback: (processed) => void;
    url: string;
}
