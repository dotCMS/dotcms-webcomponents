/// <reference types="react" />
import { Element, Event, EventEmitter } from '../../stencil-public-runtime';
import '@material/mwc-icon';
export declare class DotMaterialIcon {
    element: HTMLElement;
    showSuggestions: boolean;
    suggestionArr: string[];
    selectedSuggestionIndex: number;
    /** Value for input placeholder */
    placeholder: string;
    /** Name that will be used as ID */
    name: string;
    /** Value set from the dropdown option */
    value: string;
    /** Color value set from the input */
    colorValue: string;
    /** Values that the auto-complete textbox should search for */
    suggestionlist: string[];
    dotValueChange: EventEmitter<{
        name: string;
        value: string;
        colorValue: string;
    }>;
    handleWindowClick(e: Event): void;
    componentWillLoad(): void;
    findMatch: (searchTerm: string) => string[];
    onInput: (e: Event) => void;
    onChangeColor: (e: Event) => void;
    onFocus: (resetSearch: boolean) => void;
    onKeyDown: (e: KeyboardEvent) => void;
    onKeyPress: (e: KeyboardEvent) => void;
    onSelect: (selection: string) => void;
    getSuggestionElement: (suggestion: string) => JSX.Element;
    emitValues: () => void;
    render(): any;
    private scrollIntoSelectedOption;
}
