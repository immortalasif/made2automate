package com.Product_Management.apis.services;

//ProductService.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Product_Management.apis.repository.Product;
import com.Product_Management.apis.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

 private final ProductRepository productRepository;

 @Autowired
 public ProductService(ProductRepository productRepository) {
     this.productRepository = productRepository;
 }

 public List<Product> getAllProducts() {
     return productRepository.findAll();
 }

 public Product getProductById(Long productId) {
     Optional<Product> optionalProduct = productRepository.findById(productId);
     return optionalProduct.orElse(null);
 }

 public Product updateProduct(Long productId, Product updatedProduct) {
     Optional<Product> optionalProduct = productRepository.findById(productId);

     if (optionalProduct.isPresent()) {
         Product existingProduct = optionalProduct.get();
         // Update the fields you want to allow modification
         existingProduct.setName(updatedProduct.getName());
         existingProduct.setDescription(updatedProduct.getDescription());
         existingProduct.setPrice(updatedProduct.getPrice());
         existingProduct.setQuantity(updatedProduct.getQuantity());
         existingProduct.setImage(updatedProduct.getImage());

         // Save the updated product
         return productRepository.save(existingProduct);
     } else {
         // Product not found
         return null;
     }
 }

 public String deleteProduct(Long productId) {
     Optional<Product> optionalProduct = productRepository.findById(productId);

     if (optionalProduct.isPresent()) {
         productRepository.deleteById(productId);
         return "Product deleted successfully";
     } else {
         // Product not found
         return "Product not found";
     }
 }

 public Product saveProduct(Product product) {
     // Save a new product
     return productRepository.save(product);
 }
}

