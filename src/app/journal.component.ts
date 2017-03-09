import { Component }       from '@angular/core';


@Component({selector: 'my-journal',
  template:`      
<md-grid-list cols="2">
  <md-grid-tile
    [colspan]="1"
    [rowspan]="1"
    [style.background]="'lightblue'">
    <div style="height: 100%; width: 100%"
        class="flex-container" fxLayout="column" fxLayoutAlign="start stretch">
        <md-card fxflex style="margin-top: 8px; margin-left: 8px; margin-right: 8px">
          <md-card-header>
            <md-card-title>Today</md-card-title>
          </md-card-header>
          <md-card-content>
            <md-list>
              <md-list-item [style.background]="'lightgreen'">
                  <md-icon md-list-avatar>close</md-icon>
                  <h4 md-line>Photos</h4>
                  <p md-line> 9:45 - 10:55 </p>
              </md-list-item> 
              <md-list-item [style.background]="'lightpink'">
                  <md-icon md-list-avatar>query_builder</md-icon>
                  <h4 md-line>Dentiste</h4>
                  <p md-line> 11:00 - 11:55 </p>
              </md-list-item>
              <md-list-item>
                  <md-icon md-list-avatar>crop_square</md-icon>
                  <h4 md-line>Photos</h4>
                  <p md-line> Estimated: 2:00 </p>
              </md-list-item>
              <md-list-item [style.background]="'goldenrod'">
                  <md-icon md-list-avatar>chevron_right</md-icon>
                  <h4 md-line>Smals</h4>
                  <p md-line> continue on next day </p>
              </md-list-item>
              <md-list-item [style.background]="'tomato'">
                  <md-icon md-list-avatar>arrow_forward</md-icon>
                  <h4 md-line>WC</h4>
                  <p md-line> Delayed </p>
              </md-list-item>
          </md-list>
          </md-card-content>
        </md-card>
        <md-card fxflex style="margin-top: 8px; margin-left: 8px; margin-right: 8px">
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
        <md-card fxflex style="margin-top: 8px; margin-left: 8px; margin-right: 8px">
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
        <md-card fxflex style="margin-top: 8px; margin-left: 8px; margin-right: 8px">
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
        <md-card fxflex style="margin-top: 8px; margin-left: 8px; margin-right: 8px">
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
        <md-card fxflex style="margin-top: 8px; margin-left: 8px; margin-right: 8px">
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
        <md-card fxflex style="margin-top: 8px; margin-left: 8px; margin-right: 8px">
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
