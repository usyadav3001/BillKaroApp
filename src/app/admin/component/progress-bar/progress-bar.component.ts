import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() jsonData: {
    value: 0
    text: ''
    isError: false
  };
  @Input() jsonDef: {
    attribute?: any,
    mode?: string,
    displayAtTop?: boolean
  };
  @Input() progressType = 'progressBar'; // progressSpinner
  constructor() { }

  ngOnInit() {
  }

  getProgressBarMode() {
    return 'indeterminate';
  }
}
