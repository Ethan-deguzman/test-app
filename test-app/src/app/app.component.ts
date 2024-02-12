import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartsSelectorComponent } from './charts-selector/charts-selector.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ChartsSelectorComponent]
})
export class AppComponent {
  title = 'test-app';
}
