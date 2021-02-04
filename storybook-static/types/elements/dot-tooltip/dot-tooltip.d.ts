export declare class DotTooltip {
    el: HTMLElement;
    content: string;
    for: string;
    delay: number;
    position: string;
    private targetEl;
    private tooltipEl;
    private showing;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private appendTooltip;
    private bindEvents;
    private showTooltip;
    private removeToolTip;
    private unBindEvents;
    render(): any;
}
