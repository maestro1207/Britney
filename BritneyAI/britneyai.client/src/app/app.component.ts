import { Component, OnInit } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ChatComponent],
})
export class AppComponent {
  title = 'britneyai.client';
}
