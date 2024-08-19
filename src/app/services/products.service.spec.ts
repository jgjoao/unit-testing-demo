import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';


  describe('ProductsService', () => {
    let service: ProductsService;
    let httpController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ProductsService],
      });
      service = TestBed.inject(ProductsService);
      httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpController.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should test getProducts', () => {
      const response = [
        {
          id: '1',
          title: 'Novo Produto 1',
          description: 'Nova descrição 1',
          price: '19.99',
          category: 'Nova categoria 1',
        },
        {
          id: '2',
          title: 'Novo Produto 2',
          description: 'Nova descrição 2',
          price: '19.99',
          category: 'Nova categoria 2',
        }
      ];

      service.getProducts().subscribe((res) => {

        expect(res).toEqual(response);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `https://fakestoreapi.com/products`,
      });
      req.flush(response);
    });



    it('should test saveProducts', () => {
      const response =
        {
          id: '1',
          title: 'Novo Produto 1',
          description: 'Nova descrição 1',
          price: '19.99',
          category: 'Nova categoria 1',
        };
       const datatest ={
          title: 'Novo Produto 2',
          description: 'Nova descrição 2',
          price: '19.99',
          category: 'Nova categoria 2',
        }


      service.saveProduct(datatest).subscribe((res) => {

        expect(res).toEqual(response);
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: `https://fakestoreapi.com/products`,
      });
      req.flush(response);
    });

    it('should test updateProduct', () => {
      const response =
        {
          id: '1',
          title: 'Novo Produto 1',
          description: 'Nova descrição 1',
          price: '19.99',
          category: 'Nova categoria 1',
        };
       const datatest ={
          id: '1',
          title: 'Novo Produto 2',
          description: 'Nova descrição 2',
          price: '19.99',
          category: 'Nova categoria 2',
        }


    service.updateProduct(datatest).subscribe((res) => {

      expect(res).toEqual(response);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `https://fakestoreapi.com/products/${datatest.id}`,
    });
    req.flush(response);
  });

    it('should test deleteProduct', () => {
      const response = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category',
      };
      const datatest = {
        id: '1',
      };


    service.deleteProduct(+datatest.id).subscribe((res) => {

      expect(res).toEqual(response);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `https://fakestoreapi.com/products/${datatest.id}`,
    });
    req.flush(response);
  });


  });
