import { Component, Prop, State, Listen, Element, h, Event, EventEmitter } from '@stencil/core';
import { DotFieldValueEvent } from '../../models';
import { MaterialIconClasses } from './material-icon-classes';
import '@material/mwc-icon';

@Component({
    tag: 'dot-material-icon',
    shadow: true,
    styleUrl: 'dot-material-icon.scss'
})
export class DotMaterialIcon {
    @Element() element: HTMLElement;

    @State() showSuggestions: boolean;
    @State() suggestionArr: string[] = [];
    @State() selectedSuggestionIndex: number;

    /** Value for input placeholder */
    @Prop({ reflectToAttr: true }) placeholder: string = '';

    /** Name that will be used as ID */
    @Prop({ reflectToAttr: true })
    name = '';

    /** Value set from the dropdown option */
    @Prop({ mutable: true, reflectToAttr: true })
    value = '';

    /** Values that the auto-complete textbox should search for */
    @Prop({ reflectToAttr: true }) suggestionlist: string[] = MaterialIconClasses;

    @Event()
    dotValueChange: EventEmitter<DotFieldValueEvent>;

    @Listen('click', { target: 'window' })
    handleWindowClick(e: Event) {
        if (!this.element.contains(e.target as HTMLElement)) {
            this.showSuggestions = false;
            this.selectedSuggestionIndex = undefined;
        }
    }

    componentWillLoad() {
        this.dotValueChange.emit({
            name: this.name,
            value: this.value
        });
    }

    findMatch = (searchTerm: string): string[] => {
        return this.suggestionlist.filter(
            (term) => term.slice(0, searchTerm.length) === searchTerm && term !== searchTerm
        );
    };

    onInput = (e: Event) => {
        this.value = (e.target as any).value;
        this.suggestionArr = this.findMatch(this.value);
        this.showSuggestions = true;
    };

    onFocus = (resetSearch: boolean) => {
        this.showSuggestions = true;
        this.selectedSuggestionIndex = undefined;
        const match = resetSearch ? '' : this.value;
        this.suggestionArr = this.findMatch(match);

        if (resetSearch) {
            const input: HTMLInputElement = this.element.shadowRoot.querySelector(
                '.dot-material-icon__input'
            );
            input.focus();
        }
    };

    onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowUp':
                if (this.suggestionArr.length > 0) {
                    this.selectedSuggestionIndex =
                        this.selectedSuggestionIndex === undefined ||
                        this.selectedSuggestionIndex === 0
                            ? this.suggestionArr.length - 1
                            : this.selectedSuggestionIndex - 1;

                    this.scrollIntoSelectedOption(this.selectedSuggestionIndex);
                }
                break;
            case 'ArrowDown':
                if (this.suggestionArr.length > 0) {
                    this.selectedSuggestionIndex =
                        this.selectedSuggestionIndex === undefined ||
                        this.selectedSuggestionIndex === this.suggestionArr.length - 1
                            ? 0
                            : this.selectedSuggestionIndex + 1;

                    this.scrollIntoSelectedOption(this.selectedSuggestionIndex);
                }
                break;
            default:
                break;
        }
    };

    onKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.selectedSuggestionIndex !== undefined) {
                this.onSelect(this.suggestionArr[this.selectedSuggestionIndex]);
            }
        }
    };

    onSelect = (selection: string) => {
        this.value = selection;
        this.selectedSuggestionIndex = undefined;
        this.showSuggestions = false;
        this.dotValueChange.emit({
            name: this.name,
            value: this.value
        });
    };

    getSuggestionElement = (suggestion: string): JSX.Element => {
        const isSelected =
            this.selectedSuggestionIndex !== undefined &&
            suggestion === this.suggestionArr[this.selectedSuggestionIndex];
        return (
            <li
                class={
                    'dot-material-icon__option ' +
                    (isSelected ? 'dot-material-icon__option-selected' : '')
                }
                onClick={() => this.onSelect(suggestion)}
            >
                <mwc-icon>{suggestion}</mwc-icon>
                {suggestion}
            </li>
        );
    };

    render() {
        return (
            <div class="dot-material-icon">
                <input
                    class="dot-material-icon__input"
                    type="text"
                    placeholder={this.placeholder}
                    value={this.value}
                    onInput={(e) => this.onInput(e)}
                    onClick={() => this.onFocus(false)}
                    onKeyDown={(e) => this.onKeyDown(e)}
                    onKeyPress={(e) => this.onKeyPress(e)}
                />
                <button class="dot-material-icon__button" onClick={() => this.onFocus(true)}>
                    <mwc-icon>arrow_drop_down</mwc-icon>
                </button>
                <ul class="dot-material-icon__list" role="listbox" hidden={!this.showSuggestions}>
                    {this.suggestionArr.map((suggestion) => this.getSuggestionElement(suggestion))}
                </ul>
            </div>
        );
    }

    private scrollIntoSelectedOption(index: number) {
        const optionsList = this.element.shadowRoot.querySelectorAll('.dot-material-icon__option');
        optionsList[index].scrollIntoView({
            behavior: 'smooth'
        });
    }
}
