import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { OrderReport } from 'src/app/shared/orderreport';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {
  orderReport!: OrderReport;
  isDataLoaded: boolean = false; // Flag to track if data is loaded

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.GenerateOrderReport().subscribe(
      (report: OrderReport) => {
        this.orderReport = report;
        this.isDataLoaded = true; // Mark data as loaded
        console.log('Received report:', this.orderReport);
      },
      error => {
        console.error('Error fetching order report:', error);
      }
    );
  }
}
