import { Component }       from '@angular/core';


@Component({selector: 'my-journal',
  template:`
    <md-grid-list cols="2">
      <md-grid-tile
        [colspan]="1"
        [rowspan]="1"
        [style.background]="'lightblue'">
      <md-card>
        <md-card-header>
          <md-card-title>Today</md-card-title>
        </md-card-header>
        <md-card-content>
        </md-card-content>
        <md-card-actions>
          <button md-button>LIKE</button>
          <button md-button>SHARE</button>
        </md-card-actions>
      </md-card>
      <md-card>
        <md-card-header>
          <md-card-title>Today</md-card-title>
        </md-card-header>
        <md-card-content>
        </md-card-content>
        <md-card-actions>
          <button md-button>LIKE</button>
          <button md-button>SHARE</button>
        </md-card-actions>
      </md-card>
      </md-grid-tile>
      <md-grid-tile
        [colspan]="1"
        [rowspan]="1"
        [style.background]="'#DDBDF1'">
        Future
      </md-grid-tile>
</md-grid-list>

`})

export class JournalComponent {

}
