import { Injectable , NotFoundException} from "@nestjs/common";

import { Product } from './product.model';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product( prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProduct()
    {
        return[...this.products];
    }

    getSingleProduct(productId: string)
    {
        // const product = this.products.find((prod) => prod.id == productId);
        // if(!product)
        // {
        //     throw new NotFoundException('Could not Found Product');
        // }
        const product = this.findProduct(productId)
        return{...product};
    }

    updateProduct(productId: string, title: string, desc: string, price: number)
    {
        const [product, index] = this.findProduct(productId);
        const updateProduct = {...product};
        if(title)
        {
            updateProduct.title = title;
        }
        if(desc)
        {
            updateProduct.description = desc;
        }
        if(price)
        {
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;
    }

    private findProduct(id:string): [Product, number]
    {
        const productindex = this.products.findIndex(prod=>prod.id===id);
        const product = this.products[productindex];
        if(!product)
        {
            throw new NotFoundException('Could not Found Product');
        }
        return [product, productindex];

    }

    deleteProduct(prodId: string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }
}