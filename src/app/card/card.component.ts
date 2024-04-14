import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title: string = 'Card Title';
  @Input() buttonText: string = '';
  @Output() onButtonClick = new EventEmitter<void>();

  constructor() {}

  onButtonClicked() {
    this.onButtonClick.emit();
  }
}
