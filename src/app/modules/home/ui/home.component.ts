
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [TranslateModule, RouterModule],
  styleUrls: ['./home.component.scss'],
  standalone: true
})
export class HomeComponent {}
