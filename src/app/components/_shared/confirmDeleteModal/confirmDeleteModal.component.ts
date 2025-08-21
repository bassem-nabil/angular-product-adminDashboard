import { Component, inject, Inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-confirmDeleteModal',
  template: `
  <div class="modal-header">
      <h4 class="modal-title">Confirm Deletion</h4>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete these product/s?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-light-link" (click)="close()">Cancel</button>
      <button class="btn btn-danger" (click)="confirmDelete()">Delete</button>
    </div>
    `,
})
export class ConfirmDeleteModalComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  ngOnInit() {
  }

  close() {
    this.activeModal.dismiss();
  }

  confirmDelete() {
    this.activeModal.close(true);
  }

}
