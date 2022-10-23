import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { bookForm } from '../model/book.dashboard.model';
import { HttpProviderService } from '../shared/http-provider.service';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css'],
})
export class BookDashboardComponent implements OnInit {
  formValue!: FormGroup;
  editBookForm: bookForm = new bookForm();
  bookList: any = [];

  isSubmitted: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      language: ['', [Validators.required, Validators.minLength(3)]],
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      publisher: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  AddNewBook(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      console.log('Form Values', this.formValue.value);
      this.httpProvider.createBook(this.formValue).subscribe(
        async (data) => {
          if (data != null && data.body != null) {
            if (data != null && data.body != null) {
              var resultData = data.body;
              if (resultData != null && resultData.isSuccess) {
                this.toastr.success(resultData.message);
                setTimeout(() => {
                  this.router.navigate(['/']);
                }, 500);
              }
            }
          }
        },
        async (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        }
      );
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
    } else {
      this.toastr.error('Please fill all the fields');
    }
  }

  async getAllBooks() {
    this.httpProvider.getAllBooks().subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.bookList = resultData;
          }
        }
      },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.bookList = [];
            }
          }
        }
      }
    );
  }

  getBookDetailById() {
    this.httpProvider.getBookDetailById(this.editBookForm.id).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.editBookForm.title = resultData.title;
            this.editBookForm.author = resultData.author;
            this.editBookForm.description = resultData.description;
            this.editBookForm.category = resultData.category;
            this.editBookForm.language = resultData.language;
            this.editBookForm.isbn = resultData.isbn;
            this.editBookForm.publisher = resultData.publisher;
          }
        }
      },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.bookList = [];
            }
          }
        }
      }
    );
  }

  editBook(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.updateBook(this.editBookForm).subscribe(
        async (data) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              if (resultData != null && resultData.isSuccess) {
                this.toastr.success(resultData.message);
                setTimeout(() => {
                  this.router.navigate(['/Home']);
                }, 500);
              }
            }
          }
        },
        async (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
  }

  deleteBook(book: any) {
    this.httpProvider.deleteBookById(book.id).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            this.toastr.success(resultData.message);
            this.getAllBooks();
          }
        }
      },
      (error: any) => {}
    );
  }
}
