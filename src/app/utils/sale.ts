import { Product } from "../home/constants/product";

export interface Sale {
    clientId: string;
    cardholderName: string;
    dateSale: string;
    products: Product[];
    contact?: any;
    shippingAddress: String;
    shippingInfo: any;
    total: number;
    collection_id: string;
    collection_status: string;
    merchant_order_id: string;
    payment_id: string;
    payment_type: string;
    preference_id: string;
    processing_mode: string;
    site_id: string;
    status: string;
}