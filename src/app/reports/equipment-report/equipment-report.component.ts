import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EquipmentReport } from 'src/app/shared/EReport';
import { EquipmentType } from 'src/app/shared/equipment_type';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-equipment-report',
  templateUrl: './equipment-report.component.html',
  styleUrls: ['./equipment-report.component.scss']
})
export class EquipmentReportComponent implements OnInit {
  equipmentReport: EquipmentReport[] = [];
  equipmentTypes: EquipmentType[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const equipmentReport$ = this.dataService.GenerateEquipmentReport();
    const equipmentTypes$ = this.dataService.GetAllEquipmentTypes();

    forkJoin([equipmentReport$, equipmentTypes$]).subscribe(
      ([reportData, typesData]: any) => {
        this.equipmentReport = reportData.report.$values;
        this.equipmentTypes = typesData;

        console.log('Equipment Report Data:', this.equipmentReport);
        console.log('Equipment Types Data:', this.equipmentTypes);
      },
      (error) => {
        console.log('Error fetching data:', error);
      }
    );
  }

  getEquipmentTypeName(equipmentTypeID: number): string {
    console.log('Equipment Type ID:', equipmentTypeID);

    const equipmentType = this.equipmentTypes.find(
      (et) => et.equipmentType_ID === equipmentTypeID
    );
    console.log('Matching Equipment Type:', equipmentType);

    return equipmentType ? equipmentType.name : 'Unknown';
  }

  generatePDF() {
    const doc = new jsPDF();
    const tableData: any[] = [];

    this.equipmentReport.forEach((equipment) => {
      return tableData.push([
        equipment.name,
        equipment.equipmentType,
        equipment.quantityOnHand,
        equipment.lastEdited
      ]);
    });

    // Use the autoTable extension
    (doc as any).autoTable({
      head: [
        ['Name', 'Equipment Type', 'Quantity On Hand', 'Last Edited']
      ],
      body: tableData
    });

    doc.save('equipment_report.pdf');
  }
}
