import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {navs} from "./feature/configs/route.config";

const routes: Routes = [];
navs.forEach((element) => {
  routes.push({
    path: element.path,
    component: element.component,
    redirectTo: element.redirectTo,
    pathMatch: element.pathMatch,
    data: element.data,
    //children: element.children,
  });
});
@NgModule({
  imports: [RouterModule.forRoot(routes,
    //{ enableTracing: true }
    )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
