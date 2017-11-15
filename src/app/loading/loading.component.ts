import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public visible = false;

  ngOnInit() {
  }
  public show(): void {
    this.visible = true;
    // this.visibleAnimate = true;
    // setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    // this.visibleAnimate = false;
    this.visible = false;
   // setTimeout(() => this.visible = false, 300);
  }

  /*public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }*/

}
