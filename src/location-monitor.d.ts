import { GeoLocation } from './location';

/**
 * Provides options for location monitoring.
 */
export interface Options {
    /**
     * Specifies desired accuracy in meters. Defaults to DesiredAccuracy.HIGH
     */
    desiredAccuracy?: number;

    /**
     * Update distance filter in meters. Specifies how often to update. Default on iOS is no filter, on Android it is 0 meters
     */
    updateDistance?: number;

    /**
     * Minimum time interval between location updates, in milliseconds (ignored on iOS)
     */
    minimumUpdateTime?: number;

    /**
     * how old locations to receive in ms.
     */
    maximumAge?: number;

    /**
     * how long to wait for a location in ms.
     */
    timeout?: number;

    /**
     * monitor the location in the background.
     */
    skipPermissionCheck?: boolean;
    /**
     * monitor the location in the background.
     */
    dontOpenSettings?: boolean;

    /**
     * iOS only
     */
    allowsBackgroundLocationUpdates?: boolean;
    /**
     * iOS only
     */
    pausesLocationUpdatesAutomatically?: boolean;
    /**
     * iOS only
     */
    activityType?: any; // CLActivityType
    /**
     * iOS only
     */
    deferredLocationUpdates?: {
        traveled: number;
        timeout: number;
    };
    onDeferred?: deferredCallbackType;

    /**
     * android only
     */
    provider?: string;
}

declare type successCallbackType = (location: GeoLocation, manager?: any /*CLLocationManager*/) => void;
declare type errorCallbackType = (error: Error) => void;
declare type deferredCallbackType = (error?: Error) => void;

export function getCurrentLocation(options: Options): Promise<Location>;
export function watchLocation(successCallback: successCallbackType, errorCallback: errorCallbackType, options: Options): Promise<number>;
export function clearWatch(watchId: number): void;
export declare function authorize(always?: boolean): Promise<void>;
export declare function enable(always?: boolean): Promise<void>;
export declare function isEnabled(): boolean;
export declare function isAuthorized(): Promise<boolean>;
export function distance(loc1: Location, loc2: Location): number;

export class LocationMonitor {
    static getLastKnownLocation(): Location;
    static startLocationMonitoring(options: Options, locListener: any): void;
    static createListenerWithCallbackAndOptions(successCallback: successCallbackType, options: Options): any;
    static stopLocationMonitoring(locListenerId: number): void;
}