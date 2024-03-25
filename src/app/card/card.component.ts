import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() title: string = 'Card Title';
  @Input() buttonText: string = '';
  @Output() onButtonClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    console.log('CardComponent initialized');
  }

  onButtonClicked() {
    this.onButtonClick.emit();
  }
}
