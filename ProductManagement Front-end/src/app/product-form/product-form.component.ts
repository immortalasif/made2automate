// src/app/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import JsBarcode from 'jsbarcode';
import { Product } from '../path-to-correct-location/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: null,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: ''
  };
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error loading products:', error);
      }
    );
  }

  generateBarcode() {
    const barcodeContent = this.product.name + this.product.price;
    JsBarcode("#barcode", barcodeContent, {
      format: "CODE128",
      displayValue: true,
      fontSize: 14,
      margin: 10
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.image = reader.result as string;
      };
    }
  }

  onSubmit() {
    if (this.product.id) {
      // Update existing product
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        (response: any) => {
          console.log('Product updated successfully:', response);
          this.loadProducts(); // Refresh the product list
        },
        (error: any) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      // Create new product
      this.productService.createProduct(this.product).subscribe(
        (response: any) => {
          console.log('Product created successfully:', response);
          this.loadProducts(); // Refresh the product list
        },
        (error: any) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }

  editProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      (response: any) => {
        this.product = response;
      },
      (error: any) => {
        console.error('Error loading product for editing:', error);
      }
    );
  }

  createOrUpdateProduct() {
    if (this.product.id) {
      // Update existing product
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        (response: any) => {
          console.log('Product updated successfully:', response);
          // Handle success, e.g., show a success message
        },
        (error: any) => {
          console.error('Error updating product:', error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      // Create new product
      this.productService.createProduct(this.product).subscribe(
        (response: any) => {
          console.log('Product created successfully:', response);
          // Handle success, e.g., show a success message
        },
        (error: any) => {
          console.error('Error creating product:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (response: any) => {
        console.log('Product deleted successfully:', response);
        this.loadProducts(); // Refresh the product list
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  resetForm() {
    this.product = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: ''
    };
  }
}
