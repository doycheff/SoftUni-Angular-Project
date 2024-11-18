import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LatestBookComponent } from "./latest-book/latest-book.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LatestBookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
