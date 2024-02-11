import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class Snackbarservice {
  constructor(public snackBar: MatSnackBar) { }
  openedSnackBar: any;

  showSnackBar(status: string, message: string, buttonName?: string) {
    const config = new MatSnackBarConfig();
    if (buttonName === undefined) {
      buttonName = '';
    }
    config.duration = 300000;
    this.openSnackBar(status, message, buttonName, config);
  }

  openSnackBar(status: string, message: string, buttonName?: string, config?:any) {
    if (buttonName === undefined) {
      buttonName = '';
    }
    config.horizontalPosition = 'end';
    config.verticalPosition = 'bottom';
    let msgSVG = '';
    if (status === 'Success') {
      config.panelClass = ['snackBar-Success'];
      // tslint:disable-next-line:quotemark max-line-length
      msgSVG = "<P class='msg-icon'><svg width='21' height='19' viewBox='0 0 21 19' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M11.3043 0L2.82609 7.91304L0 5.08696' transform='translate(5 1)' stroke='white' stroke-linecap='round' stroke-linejoin='round'/><path d='M0.5 1.5H20.5' transform='translate(0 17)' stroke='white' stroke-linecap='square'/></svg></P>";
    } else if (status === 'Info') {
      config.panelClass = ['snackBar-Info'];
      // tslint:disable-next-line:quotemark max-line-length
      msgSVG = "<P class='msg-icon'><svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='21' height='21' x='0px' y='0px' viewBox='0 0 1000 1000' enable-background='new 0 0 1000 1000' xml:space='preserve'><metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><path d='M973.3,805.9L586,102.2c-20.7-37.7-52.1-59.3-86-59.3c-33.9,0-65.2,21.6-86,59.3L26.7,805.9c-20.5,37.3-22.2,75.2-4.6,104.9c17.6,29.7,52,46.3,94.6,46.3h766.7c42.5,0,77-16.5,94.6-46.3C995.5,881.1,993.8,843.2,973.3,805.9z M914.2,873.1c-3.8,6.4-15.6,9.9-30.8,9.9H116.6c-15.2,0-27-3.5-30.8-9.9c-3.8-6.4-1.6-18.4,5.8-31.8l387.3-703.6c7.9-14.4,16.5-20.9,21.1-20.9c4.6,0,13.2,6.6,21.1,21l387.3,703.5C915.8,854.7,918,866.7,914.2,873.1z'/><path d='M499.1,304.2c-24.5,0-44.3,19.9-44.3,44.4v255.9c0,24.5,19.8,44.4,44.3,44.4c24.5,0,44.3-19.9,44.3-44.4V348.6C543.4,324.1,523.6,304.2,499.1,304.2z'/><path d='M499.8,692.6c-11.6,0-23.2,4.8-31.4,13c-8.2,8.2-13,19.8-13,31.4c0,11.6,4.8,23.2,13,31.4c8.2,8.2,19.8,13,31.4,13c11.6,0,23.2-4.8,31.4-13c8.2-8.2,13-19.8,13-31.4c0-11.6-4.8-23.2-13-31.4C523,697.4,511.4,692.6,499.8,692.6z'/></g></svg></P>";
    } else {
      console.error(message);
      config.panelClass = ['snackBar-Failure'];
      // tslint:disable-next-line:quotemark max-line-length
      msgSVG = "<P class='msg-icon'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' width='21' height='21' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve' width='512px' height='512px'><g><path d='M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M256,490.667     C126.604,490.667,21.333,385.396,21.333,256S126.604,21.333,256,21.333S490.667,126.604,490.667,256S385.396,490.667,256,490.667     z' fill='#FFFFFF'/><path d='M359.542,152.458c-4.167-4.167-10.917-4.167-15.083,0L256,240.917l-88.458-88.458c-4.167-4.167-10.917-4.167-15.083,0     c-4.167,4.167-4.167,10.917,0,15.083L240.917,256l-88.458,88.458c-4.167,4.167-4.167,10.917,0,15.083     c2.083,2.083,4.813,3.125,7.542,3.125s5.458-1.042,7.542-3.125L256,271.083l88.458,88.458c2.083,2.083,4.813,3.125,7.542,3.125     c2.729,0,5.458-1.042,7.542-3.125c4.167-4.167,4.167-10.917,0-15.083L271.083,256l88.458-88.458     C363.708,163.375,363.708,156.625,359.542,152.458z' fill='#FFFFFF'/></g></svg></P>";
    }
    this.openedSnackBar = this.snackBar.open(message, buttonName, config);
    // this.openedSnackBar.afterDismissed().subscribe(info => {
    //   this.openedSnackBar = undefined;
    // });
    document.getElementsByClassName('mat-mdc-simple-snack-bar')
    [document.getElementsByClassName('mat-mdc-simple-snack-bar').length - 1].innerHTML =
      msgSVG + '<p class="msgbox widgetcont">' + message + '</p>';
  }
}
