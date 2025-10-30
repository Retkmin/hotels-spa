
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [TranslateModule],
  styleUrls: ['./home.component.scss'],
  standalone: true
})
export class HomeComponent {}
