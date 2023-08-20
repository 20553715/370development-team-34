import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BookReport, BookReportItem } from 'src/app/shared/bookreport'; // Double-check the import path

@Component({
  selector: 'app-report',
  templateUrl: './book-report.component.html',
  styleUrls: ['./book-report.component.scss']
})
export class BookReportComponent implements OnInit {
  bookReportData: BookReportItem[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadBookReport();
  }

  loadBookReport() {
    this.dataService.generateBookInventoryReport().subscribe(
      (response: BookReport) => {
        console.log('Received response:', response);
        this.bookReportData = response.$values;
      },
      error => {
        console.error('Error loading book report:', error);
      }
    );
  }
}
