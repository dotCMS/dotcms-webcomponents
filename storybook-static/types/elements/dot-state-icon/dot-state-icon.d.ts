import { DotContentState } from 'dotcms-models';
export declare class DotStateIcon {
    state: DotContentState;
    size: string;
    labels: {
        archived: string;
        published: string;
        revision: string;
        draft: string;
    };
    render(): any;
    private getType;
    private isTrue;
}
