import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./component/header/header.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, ReactiveFormsModule, CommonModule, HeaderComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
	title = "client";
}
