export type User = {
    "id"?: number,
    "nome": string,
    "email": string,
    "senha": string,
    "morada"?: string,
    "cp"?: string,
    "pais"?: string,
    "admin": boolean,
    "ativo": boolean,
    "shopCar"?: number[],
    "wishList"?: number[],
}