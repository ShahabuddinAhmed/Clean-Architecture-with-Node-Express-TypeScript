import { ProductEntityGateway } from "./persistence/entityGateway/productEntityGateway";

export const newProductEntityGateway = () => {
    return new ProductEntityGateway();
}