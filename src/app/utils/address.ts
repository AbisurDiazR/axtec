export interface Address {
    street: string;
    externalNumber: string;
    internalNumber: string,
    locality: string,
    zip: string;
    city: string;
    state: string;
    country: string;
    clientId: string;
    selected?: boolean;
}