import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';

// STORE
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../../@store/app-store';

// RXJS
import { Observable } from 'rxjs/internal/Observable';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private appStore: Store<fromAppStore.AppState>,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.appStore.select(fromAppStore.getAuthenticated)
            .pipe(
                tap(auth => {
                    console.log(auth)
                    if (auth) {
                        // this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
                        return true;
                    }
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return false;
                }),
                take(1)
            )

    }

}