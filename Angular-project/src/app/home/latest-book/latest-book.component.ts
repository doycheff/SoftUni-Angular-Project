import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-latest-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './latest-book.component.html',
  styleUrl: './latest-book.component.css'
})
export class LatestBookComponent {

}
