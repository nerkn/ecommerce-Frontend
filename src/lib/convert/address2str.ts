import { UserAddress } from "src/types/db";

export function address2str(address: UserAddress) {
    return `${address.title}:
    ${address.city}
    ${address.address}  
    ${address.detail}  
    `
}