import {Component} from '@angular/core'
import {ActivityContextMenuService} from './activity-contextmenu.service'

@Component({
    selector: 'activity-contextmenu',
    template: `
    <ul  id="contextMenu2" class="dropdown-menu" role="menu" aria-labelledby="menu1" [ngStyle]="activityContextMenuService.locationCss">
        <li role="presentation" *ngFor="let link of activityContextMenuService.links"> <a role="menuitem" tabindex="-1" (click)="activityContextMenuService.menuClicked(link)">{{link}}</a></li>    
    </ul>`,
    host:{
        '(document:click)':'clickedOutside()',
    },
})
export class ActivityContextmenuComponent {

    constructor(private activityContextMenuService: ActivityContextMenuService) {}

    clickedOutside() {
        this.activityContextMenuService.visible = false;
    }
}