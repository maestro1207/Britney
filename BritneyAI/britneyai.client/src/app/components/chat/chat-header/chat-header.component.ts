import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './chat-header.component.html',
})
export class ChatHeaderComponent {}
