import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IBreadCrumb } from '../components/breadcrumb/breadcrumb.component';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private readonly _breadcrumbs$ = new BehaviorSubject<IBreadCrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(event => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: IBreadCrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);

      this._breadcrumbs$.next(breadcrumbs);
      this.breadcrumbs$.subscribe(e=>console.log('-----',e));
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: IBreadCrumb[]) {
    if (route) {
      // Construct the route URL
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));

      // Add an element for the current route part
      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: '/' + routeUrl.join('/')
        };
        breadcrumbs.push(breadcrumb);
      }

      // Add another element for the next route part
      this.addBreadcrumb(route?.firstChild!, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: Data) {
    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  }

}
