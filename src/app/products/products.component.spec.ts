import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'getProducts',
    'deleteProduct',
  ]);

  mockProductService.getProducts.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch products successfully', () => {
    // Arrange
    const mockProducts: Product[] = [
      {
        id: '1', title: 'Product 1', price: '10',
        description: '',
        category: ''
      },
      {
        id: '2', title: 'Product 2', price: '20',
        description: '',
        category: ''
      },
    ];
   ;

    // Act
    component.getProducts();

    // Assert
    expect(component.showSpinner).toBeFalse();
    expect(mockProductService.getProducts).toHaveBeenCalled();
    expect(component.productData).toEqual(jasmine.arrayContaining([]));
    expect(component.showSpinner).toBeFalse();
  });

  it('should open the dialog with the correct configuration', () => {
      // Arrange
      const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      (dialog.open as jasmine.Spy).and.returnValue(dialogRefSpy);

      // Act
      component.openDialog();

      // Assert
      expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
        width: '40%',
      });
    });

  it('should open the dialog with the correct configuration for editing a product', () => {
      // Arrange
      const product: Product = {
        id: '1',
        title: 'Product 1',
        price: '10',
        description: '',
        category: ''
      };
      const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      (dialog.open as jasmine.Spy).and.returnValue(dialogRefSpy);

      // Act
      component.editProduct(product);

      // Assert
      expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
        data: product,
        width: '40%',
      });
    });
    it('should delete product successfully', () => {
      // Arrange
      const product: Product = {
        id: '1',
        title: 'Product 1',
        price: '10',
        description: '',
        category: ''
      };


      mockProductService.deleteProduct.and.returnValue(of({})); // Mock the deleteProduct method to return an observable

      // Act
      component.deleteProduct(product.id);
  ;

      // Assert
      expect(matSnackBar.open).toHaveBeenCalledWith('Deleted Successfully!...', '', {
        duration: 3000
      });
    });

});
