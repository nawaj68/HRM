import {Component, OnInit} from "@angular/core";
import {routerTransition} from "src/app/core/animations/route.animation";

@Component({
  selector: "app-home",
  animations: [routerTransition],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getState(outlet: any) {
    console.log(outlet);
    return outlet.activatedRouteData.state;
  }
}
