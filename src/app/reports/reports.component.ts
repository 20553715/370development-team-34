import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent {

  
  constructor(private router: Router) { }

  navigateToBookReport(): void {
    // Log a message before navigating
    console.log('Navigating to the book report page...');
    
    // Navigate to the book report page
    this.router.navigateByUrl('/book-report');
  }

  navigateToEquipmentReport(): void {
    // Log a message before navigating
    console.log('Navigating to the equipment report page...');
    
    // Navigate to the book report page
    this.router.navigateByUrl('/equipment-report');
  }

  navigateToResaleReport(): void {
    // Log a message before navigating
    console.log('Navigating to the resale report page...');
    
    // Navigate to the book report page
    this.router.navigateByUrl('/resale-report');
  }

  navigateToOrderReport(): void {
    // Log a message before navigating
    console.log('Navigating to the order report page...');
    
    // Navigate to the book report page
    this.router.navigateByUrl('/order-report');
  }

  
}
