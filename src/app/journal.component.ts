import { Component }       from '@angular/core';


@Component({selector: 'my-journal',
  template:`      
      <md-grid-list cols="2">
  <md-grid-tile
    [colspan]="1"
    [rowspan]="1"
    [style.background]="'lightblue'">
    <div style="height: 100%; width: 100%"
    class="flex-container" fxLayout="column" fxLayoutAlign="start stretch"
  >
        <md-card fxflex style="margin-top: 8px; margin-left: 8px; margin-right: 8px">
          <md-card-header>
            <md-card-title>Today</md-card-title>
          </md-card-header>
          <md-card-content>
          On teste une fois ce que ça donne
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
          </md-card-actions>
        </md-card>
        <md-card fxflex>
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
</div>
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
