import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookForm } from '../model/book.dashboard.model';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css'],
})
export class BookDashboardComponent implements OnInit {
  formValue!: FormGroup;
  bookList: any = [];
  bookForm: BookForm = new BookForm();
  showAddBook: boolean = false;

  isSubmitted: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private bookService: BookService,
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
    this.getAllBooks();
  }

  submit() {
    this.isSubmitted = true;
    if (this.formValue.valid) {
      console.log('Form Values', this.formValue.value);
      this.bookService.createBook(this.formValue.value).subscribe(
        (data) => {
          if (data != null && data?.body != null) {
            console.log('Data', data);
            const resultData = data?.body;
            if (resultData.responseCode === 201) {
              this.toastr.success(resultData.responseMessage);
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 500);
            }
            let ref = document.getElementById('cancel');
            ref?.click();
            this.formValue.reset();
            this.getAllBooks();
          }
        },
        (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        }
      );
    } else {
      this.toastr.error('Please fill all the fields');
    }
  }

  getAllBooks() {
    this.bookList = [];
    this.bookService.getAllBooks().subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          const resultData = data.body;
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

  clickAddBook() {
    this.formValue.reset();
    this.isSubmitted = false;
    this.showAddBook = true;
  }

  openEditModal(book: any) {
    this.showAddBook = false;
    this.formValue.patchValue({
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      language: book.language,
      isbn: book.isbn,
      publisher: book.publisher,
    });
    this.bookForm.id = book.id;
  }

  updateBook() {
    this.isSubmitted = true;

    const form = {
      ...this.formValue.value,
      id: this.bookForm.id,
    };

    console.log('Form', form);
    if (this.formValue.valid) {
      this.bookService.updateBook(form).subscribe(
        (data) => {
          if (data != null && data.body != null) {
            const resultData = data.body;
            if (resultData.responseCode === 204) {
              this.toastr.success(resultData.responseMessage);
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 500);
            }
            let ref = document.getElementById('cancel');
            ref?.click();
            this.formValue.reset();
            this.getAllBooks();
          }
        },
        (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
  }

  deleteBook(id: any) {
    console.log('Id', id);
    this.bookService.deleteBookById(id).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          const resultData = data.body;
          console.log('Result Data', resultData);
          if (resultData.responseCode === 204) {
            this.getAllBooks();
            this.toastr.success(resultData.responseMessage);
          }
        }
      },
      (error: any) => {}
    );
  }
}
