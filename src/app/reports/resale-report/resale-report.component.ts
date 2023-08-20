import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { ResaleReport } from 'src/app/shared/resalereport';

@Component({
  selector: 'app-resale-report',
  templateUrl: './resale-report.component.html',
  styleUrls: ['./resale-report.component.scss']
})
export class ResaleReportComponent implements OnInit {
  resaleReports: ResaleReport[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.GenerateResaleReport().subscribe((data: any) => {
      this.resaleReports = data.$values;
    });
  }

  generatePDF() {
    const doc = new jsPDF();
    const columns = ['Date', 'Amount Exchanged', 'Resale Description', 'Evaluation Description'];
    const data = this.resaleReports.map(item => [
      item.date,
      item.amount_Exchanged.toFixed(2),
      item.resaleDescription,
      item.evaluationDescription
    ]);

    doc.text('Reseller\'s Report', 10, 10);

    // Use (doc as any).autoTable to bypass TypeScript type checking
    (doc as any).autoTable(columns, data, {
      startY: 20
    });

    doc.save('reseller_report.pdf');
  }
}
