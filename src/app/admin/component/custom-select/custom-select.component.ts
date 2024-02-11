import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent {
  @Input() options: string[] = [];
  @Output() selectedOptionsChange = new EventEmitter<string[]>();

  searchText: string = '';
  selectedOptions: string[] = [];
  showOptions: boolean = false;

  onOptionClick(option: string): void {
    if (!this.isSelected(option)) {
      this.selectedOptions.push(option);
      this.selectedOptionsChange.emit(this.selectedOptions);
    }
    this.searchText = '';
    this.toggleOptions();
  }

  removeSelectedOption(option: string): void {
    const index = this.selectedOptions.indexOf(option);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
      this.selectedOptionsChange.emit(this.selectedOptions);
    }
  }

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }
}