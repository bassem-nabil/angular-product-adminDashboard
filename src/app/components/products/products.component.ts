import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CardComponent } from '../_shared/card/card.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductModel } from 'src/app/models/productModel';
import { ProductService } from 'src/app/services/product.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ConfirmDeleteModalComponent } from '../_shared/confirmDeleteModal/confirmDeleteModal.component';
import { Store } from '@ngrx/store';
import { ProductsActions } from 'src/app/store/actions/product.actions';
import { selectAll, selectTotalCount } from 'src/app/store/selectors/product.selectors';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  standalone: true,
  imports: [
    CardComponent,
    NgbModule,
    FormsModule,
    RouterLink,
    CurrencyPipe,
    NgxSkeletonLoaderModule,
    CommonModule,
    InfiniteScrollDirective
  ],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService);
  modalService = inject(NgbModal);
  toastService = inject(ToastrService);
  store = inject(Store);
  helperService = inject(HelperService);

  productsReachable: ProductModel[] = [];
  products$: Subscription = new Subscription();
  
  selectedStatus: string = 'All';
  selectedSort: string = 'createdDate_desc';
  
  searchText: string = '';
  currentPage: number = 1;
  totalCount: number = 0;
  productsPerPage: number = 5;
  showSkeletonLoader: boolean = true;

  ngOnInit() {
    this.subscribeToProducts();
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.products$) {
      this.products$.unsubscribe();
    }
  }

  sortProducts(prop: string) {
    let [sortField, sortOrder] = this.selectedSort.split('_');
    if (sortField === prop) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      this.selectedSort = `${sortField}_${sortOrder}`;
    } else {
      this.selectedSort = `${prop}_asc`;
      sortOrder = 'asc';
      sortField = prop;
    }
    // this.loadProducts();

    
    let filteredProducts =  JSON.parse(JSON.stringify(this.productsReachable));

    if (this.selectedStatus !== 'All') {
      filteredProducts = filteredProducts.filter((product: any) => product.status === this.selectedStatus);
    }

    if (this.searchText) {
      filteredProducts = filteredProducts.filter((product: any) => product.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    filteredProducts = this.helperService.dynamicSort(filteredProducts, sortField as keyof ProductModel, sortOrder);
    this.productsReachable = filteredProducts;

  }

  subscribeToProducts() {
    this.products$ = this.store.select(selectAll).subscribe(products => {
      if (this.currentPage === 1) {
        const arr = JSON.parse(JSON.stringify(products));
        this.productsReachable = Object.values(arr);
      } else {
        let response = [...this.productsReachable, ...products];
        let arr = JSON.parse(JSON.stringify(response));
        this.productsReachable = Object.values(arr);
      }
      this.productsReachable = this.productsReachable.sort((a, b) => b.createdDate - a.createdDate);
      this.productsReachable.map(c => {
        c.checked = false;
      });
      setTimeout(() => {
        this.showSkeletonLoader = false;
      }, 500);
    });

    this.products$ = this.store.select(selectTotalCount).subscribe(totalCount => {
      this.totalCount = totalCount;
    });
  }

  loadMoreProducts() {
    if (this.productsReachable.length < this.totalCount) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  loadProducts(): void {
    let props: any = {};

    if (this.selectedStatus !== 'All') {
      props['status'] = this.selectedStatus;
    }

    const [sortField, sortOrder] = this.selectedSort.split('_');
    props['_sort'] = sortField;
    props['_order'] = sortOrder.toUpperCase();

    if (this.searchText) {
      props['name_like'] = this.searchText;
    }
    props['_page'] = this.currentPage;
    props['_limit'] = this.productsPerPage;
    this.store.dispatch(ProductsActions.load({ props }));
  }

  openDeleteConfirmation(product: ProductModel | null,multiDelete: boolean = false) {
    const copyArr = JSON.parse(JSON.stringify(this.productsReachable));
    const checkedItems = copyArr.filter((item: ProductModel) => item.checked).map((item: ProductModel) => item.id);
    if (multiDelete) {
      if (checkedItems.length <= 0) {
        this.toastService.warning('You must select at least one product to delete.');
        return;
      }
    }
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    modalRef.result.then(
      (result) => {
        if (result) {
          if (multiDelete) {
            this.store.dispatch(ProductsActions.deleteMany({ ids: checkedItems }));
          } else {
            if (product) {
              this.store.dispatch(ProductsActions.delete({ id: product.id }));
            }
          }
        }
      },
      (reason) => {
        console.log('Modal dismissed');
      }
    );
  }

  applyFilter() {
    this.currentPage = 1;
    this.showSkeletonLoader = true;
    this.selectedSort = 'createdDate_desc';
    this.loadProducts();
  }

  clearFilter() {
    this.searchText = '';
    this.selectedStatus = 'All';
    this.currentPage = 1;
    this.showSkeletonLoader = true;
    this.selectedSort = 'createdDate_desc';
    this.loadProducts();
    
  }

}
