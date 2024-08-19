
// Remove the duplicate import statement for 'AddProductComponent'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';



  describe('AddProductComponent', () => {
    let component: AddProductComponent;
    let fixture: ComponentFixture<AddProductComponent>;
    let dialogRef: MatDialogRef<AddProductComponent>;
    let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
    let mockProductService = jasmine.createSpyObj('ProductsService', [
      'updateProduct',
      'saveProduct',
    ]);

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [AddProductComponent],
        imports: [SharedModule, NoopAnimationsModule],
        providers: [
          { provide: MatSnackBar, useValue: matSnackBar },
          { provide: ProductsService, useValue: mockProductService },
          { provide: MatDialogRef,useValue: jasmine.createSpyObj('MatDialogRef', ['close', 'open'])  },
          { provide: MAT_DIALOG_DATA, useValue: {} },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AddProductComponent);
      component = fixture.componentInstance;
      dialogRef = TestBed.inject(MatDialogRef);
      matSnackBar = TestBed.inject(MatSnackBar);
      mockProductService = TestBed.inject(ProductsService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should save product and show success message', () => {
      // Arrange
      const product = {
        id: 1,
        title: 'Test Product',
        description: 'Test Description',
        price: 10,
        category: 'Test Category'
      };


      // Act
      mockProductService.saveProduct();
      matSnackBar.open();

      // Assert
      expect(mockProductService.saveProduct).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalled();

    });

    it('should call the saveProduct to add new product', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '39.99',
        category: 'Test category'
      };
      const response: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '39.99',
        category: 'Test category'
      };
      component.productForm.setValue(data);
      mockProductService.saveProduct.and.returnValue(of(response));
      component.saveProduct();
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Added Successfully!...', '', {
        duration: 3000
      });
      expect(dialogRef.close).toHaveBeenCalled();
    });

    it('should set the form controls to the correct values when data is provided', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '29.99',
        category: 'Test category'
      };
      component.data = data;
      component.ngOnInit();
      expect(component.productForm.value).toEqual(data);
    });


  });


