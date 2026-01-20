import { InjectionToken } from "@angular/core";
import { environment } from "../../../environments/environment";

export const environmentToken = new InjectionToken<typeof environment>('environment');
export const environmentProvider = {
    provide: environmentToken,
    useValue: environment
};