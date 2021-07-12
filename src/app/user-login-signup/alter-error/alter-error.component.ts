import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-alter-error',
  templateUrl: './alter-error.component.html',
  styleUrls: ['./alter-error.component.scss'],
})
export class AlterErrorComponent implements OnInit {
  constructor() {}
  @Input() error: any = '';
  @Output() close = new EventEmitter<void>();
  ngOnInit(): void {}
  onClose() {
    this.close.emit();
  }
}
