export declare type PositionX = 'left' | 'right' | 'center';
export declare type PositionY = 'bottom' | 'top';
interface PositionParams {
    tooltipEl: HTMLElement;
    targetEl: HTMLElement;
    position: {
        x: PositionX;
        y: PositionY;
    };
}
export declare const fadeIn: (el: HTMLElement) => void;
export declare const getElement: (content: string) => HTMLElement;
export declare const getPosition: (params: PositionParams) => {
    top: number;
    left: number;
};
export declare const getPositionX: ({ tooltipEl: tooltip, targetEl: target, position }: PositionParams) => number;
export declare const getPositionY: ({ tooltipEl: tooltip, targetEl: target, position }: PositionParams) => number;
export {};
