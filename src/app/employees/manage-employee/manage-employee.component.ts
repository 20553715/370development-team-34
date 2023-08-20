import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Employee } from 'src/app/shared/employee';
import { EmployeeType } from 'src/app/shared/employee-type';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employeeTypes: EmployeeType[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllEmployeeTypes(); 
  }

  getAllEmployeeTypes(): void {
    this.dataService.getAllEmployeeTypes().subscribe(
      (types) => {
        this.employeeTypes = types;
      },
      (error) => {
        console.error('Error fetching employee types:', error);
      }
    );
  }

  getEmployeeTypeName(employeeTypeID: number): string {
  const employeeType = this.employeeTypes.find(type => type.employee_Type_ID === employeeTypeID);
  return employeeType ? employeeType.name : 'Unknown Type';
}

  getAllEmployees(): void {
    this.dataService.getAllEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.dataService.deleteEmployee(id).subscribe(
        (response) => {
          console.log('Delete employee response:', response);
          this.getAllEmployees(); // Refresh the employee list
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }
}
