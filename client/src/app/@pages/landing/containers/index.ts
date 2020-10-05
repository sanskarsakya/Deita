import { LoginComponent } from './login/login.component';
import { PlaygroundComponent } from './playground/playground.component';
import { LandingComponent } from './landing/landing.component';

export const containers: any[] = [
    LandingComponent,
    PlaygroundComponent,
    LoginComponent
];

export * from './landing/landing.component';
export * from './playground/playground.component';
export * from './login/login.component';