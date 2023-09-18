import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {AppModule} from "./app/app.module";
import { ConsoleExtension } from "./app/core/extensions/console.extension";
import {environment} from "./environments/environment";

if (environment.production) {
  enableProdMode();
  ConsoleExtension.clearConsole();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
