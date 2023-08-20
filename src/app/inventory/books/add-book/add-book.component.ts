import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Book } from 'src/app/shared/books';
import { Module } from 'src/app/shared/module';
import { PrescribedBook } from 'src/app/shared/prescribedbook';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  isConfirmationModalOpen: boolean = false;
  isHidden: boolean = true;
  book: Book = new Book();
  isbn: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  modules: Module [] = [];
  pres: PrescribedBook[]=[];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.bookForm = this.fb.group({
      isbn: [''],
      title: ['', Validators.required],
      publisherName: [''],
      authorName: [''],
      price: ['', Validators.min(0)],
      edition: [''],
      year: [''],
      module_Code: [''],
      quantity: [''],
      image: ['']
    });
  }

  ngOnInit() {
    this.GetAllModules();
    console.log(this.modules)
  }

  toggleHiddenDiv() {
    const isbnValue = this.bookForm.get('isbn')!.value;
    console.log('ISBN Value:', isbnValue);
  
    if (isbnValue) {
      console.log('Fetching prescribed book for ISBN:', isbnValue);
      this.dataService.GetPrescribedBookByISBN(isbnValue).subscribe((result) => {
        console.log('searchPrescribedBooks result:', result);
        if (result && result.length > 0) {
          console.log('Prescribed book found. Initializing book details...');
          const prescribedBook = result[0];
  
          // Fetch module information using module ID
          this.dataService.getModuleById(prescribedBook.module_ID).subscribe(
  (moduleInfo) => {
    if (moduleInfo) {
      // Use getModuleCode method to get the module code
      const module_Code = this.getModuleCode(prescribedBook.module_ID);

      this.book = {
                isbn: prescribedBook.isbn,
                title: prescribedBook.title,
                publisherName: prescribedBook.publisherName,
                authorName: prescribedBook.authorName,
                edition: prescribedBook.edition,
                year: prescribedBook.year,
                price: 0,
                module_Code: module_Code,
                quantity: 0,
                image: ''
              };
              this.isHidden = false;
              this.errorMessage = '';
              this.successMessage = '';
            } else {
              // Handle error fetching module information
            }
          });
        } else {
          console.log('No prescribed book found for ISBN:', isbnValue);
          this.errorMessage = 'No book found with the entered ISBN.';
          this.successMessage = '';
        }
      });
    }
  }
  
  // Method to get module code based on module ID
  getModuleCode(module_ID: number): string {
    const module = this.modules.find((m: { module_ID: number; }) => m.module_ID === module_ID);
    return module ? module.module_Code.toString() : 'N/A';
  }
  
  GetAllModules(): void {
    this.dataService.GetAllModules().subscribe(
      (modules) => {
        console.log('Modules fetched:', modules); // Check if data is being retrieved
        this.modules = modules;
      },
      (error) => {
        console.log('Error fetching modules:', error);
      }
    );
  }
  

  AddBook() {
    console.log('AddBook function called');

    // Validation
    const isValid =
      this.bookForm.valid &&
      this.bookForm.get('price')!.value > 0 &&
      this.bookForm.get('quantity')!.value > 0 &&
      this.bookForm.get('image')!.value;

    if (!isValid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    // Get data from the form
    const formData = this.bookForm.value;
    formData.isbn = this.book.isbn; // Set the ISBN from the previously fetched data

    // Make the API call to add the book
    this.dataService.AddBook(formData).subscribe(
      (response) => {
        if (response) {
          this.successMessage = 'Book added successfully!';
          this.resetForm();
        } else {
          this.errorMessage = 'Failed to add book. Please try again.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while adding the book.';
        console.error('Error adding book:', error);
      }
    );
  }


  resetForm() {
    this.book = new Book();
    this.isbn = '';
    this.isHidden = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  

  

  
}
