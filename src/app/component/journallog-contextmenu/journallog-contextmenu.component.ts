import {Component} from '@angular/core'
import {JournallogContextMenuService} from '../../service/journallog-contextmenu.service'

@Component({
  selector: 'journallog-contextmenu',
  template: `
    <ul  id="contextMenu3" class="dropdown-menu" role="menu" aria-labelledby="menu1" [ngStyle]="journallogContextMenuService.locationCss">
        <li role="presentation" *ngFor="let link of journallogContextMenuService.links"> <a role="menuitem" tabindex="-1" (click)="journallogContextMenuService.menuClicked(link)">{{link}}</a></li>    
    </ul>`,
  host:{
    '(document:click)':'clickedOutside()',
  },
})
export class JournallogContextmenuComponent {

  constructor(private journallogContextMenuService: JournallogContextMenuService) {}

  clickedOutside() {
    this.journallogContextMenuService.visible = false;
  }
}
