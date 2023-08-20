import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Equi } from 'src/app/shared/equipment2';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lab-equipment',
  templateUrl: './lab-equipment.component.html',
  styleUrls: ['./lab-equipment.component.scss']
})
export class LabEquipmentComponent implements OnInit {

  equipments: Equi[] = [];
  searchText: string = '';

  constructor(private dataservices: DataService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEquipments();
  }

  getEquipments() {
    this.dataservices.GetEquipments().subscribe(
      result => {
        console.log('API Result:', result);
        
        if (result.$values && Array.isArray(result.$values)) {
          this.equipments = result.$values.map((data: any) => new Equi());
        } else {
          console.error('Invalid response structure: $values property not found or not an array');
        }
      },
      error => {
        console.error('Error fetching equipment:', error);
      }
    );
  }
  
  

  searchEquipments() {
    if (this.searchText.trim() === '') {
      this.getEquipments();
    } else {
      this.dataservices.searchEquipment(this.searchText).subscribe(
        result => {
          this.equipments = result.map((data: any) => new Equi());
        }
      );
    }
  }

  updateEquipment(equipment_ID: number) {
    this.router.navigate(['/update_equipment', equipment_ID]);
  }

  deleteEquipment(equipment_ID: number): void {
    this.dataservices.DeleteEquipment(equipment_ID).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.router.navigate(['/lab_equipment']);
          this.getEquipments();
          this.showDeleteSuccessNotification();
        } else {
          location.reload();
          this.showDeleteSuccessNotification();
        }
      }
    );
  }

  showDeleteSuccessNotification(): void {
    const snackBarConfig: MatSnackBarConfig = {
      duration: 0,
    };

    const notificationRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
      'Equipment deleted successfully',
      'Close',
      snackBarConfig
    );

    notificationRef.onAction().subscribe(() => {
      notificationRef.dismissWithAction();
    });
  }
}