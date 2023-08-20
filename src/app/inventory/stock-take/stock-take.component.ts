import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.scss']
})
export class StockTakeComponent implements OnInit {
  stockTakeForm!: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.stockTakeForm = this.fb.group({
      cqua: '', // Current Quantity
      nqua: '', // New Quantity
      notes: ''
    });
  }

  updateStock() {
    if (this.stockTakeForm.valid) {
      const formData = this.stockTakeForm.value;
      // You need to set book_ID or equipment_ID based on your requirement
      formData.book_ID = 0; // Set the book ID here
      formData.equipment_ID = 0; // Set the equipment ID here
      
      // Choose the appropriate function based on book or equipment
      if (formData.book_ID) {
        this.dataService.updateBookStock(formData).subscribe(
          (response) => {
            // Handle success response
            console.log('Stock take for book updated:', response);
            // Reset the form or update UI as needed
            this.stockTakeForm.reset(); // Reset the form after successful update
          },
          (error) => {
            // Handle error
            console.error('Error updating book stock:', error);
          }
        );
      } else if (formData.equipment_ID) {
        this.dataService.updateEquipmentStock(formData).subscribe(
          (response) => {
            // Handle success response
            console.log('Stock take for equipment updated:', response);
            // Reset the form or update UI as needed
            this.stockTakeForm.reset(); // Reset the form after successful update
          },
          (error) => {
            // Handle error
            console.error('Error updating equipment stock:', error);
          }
        );
      }
    }
  }
}

