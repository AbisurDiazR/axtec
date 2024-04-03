export interface Product {
    id?: number;
    imagen?: string;
    titulo?: string;
    precio?: number;
    nuevo?: boolean;
    rebajado?: boolean;
    precioOriginal?: number;
    description?: string;
    images?: any[];
    cantidad?: number;
    vendedor?: string;
    categoria?: string;
    peso?: string;
    subcategorias?: string[];
}