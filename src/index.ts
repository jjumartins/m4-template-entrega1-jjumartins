import { IManageProduct, IProduct } from "./interfaces";

class ProductList implements IManageProduct {
  private productList: IProduct[] = [];
  id: number = 1;

  createProduct(data: { name: string; price: number }): IProduct {
    const newProduct: IProduct = {
      id: this.id,
      name: data.name,
      price: data.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.productList.push(newProduct);
    this.id++;
    return newProduct;
  }

  getProducts(): IProduct[] {
    return this.productList;
  }

  getOneProduct(id: number): IProduct | undefined {
    return this.productList.find(product => product.id === id);
  }

  updateProduct(id: number, data: { name?: string; price?: number }): IProduct | undefined {
    const index = this.productList.findIndex(product => product.id === id);
    if (index >= 0) {
      const product = this.productList[index];
      if (data.name !== undefined) {
        product.name = data.name;
      }
      if (data.price !== undefined) {
        product.price = data.price;
      }
      product.updatedAt = new Date();
      this.productList.splice(index, 1, product);
      return product;
    } else {
      return undefined;
    }
  }

  deleteProduct(id: number): { message: string } {
    const index = this.productList.findIndex(product => product.id === id);
    if (index >= 0) {
      this.productList.splice(index, 1);
      return { message: "Product successfully deleted." };
    } else {
      return { message: "Product not found." };
    }
  }
}

export const productList = new ProductList();