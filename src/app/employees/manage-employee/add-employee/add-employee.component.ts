import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Employee } from 'src/app/shared/employee';
import { EmployeeType } from 'src/app/shared/employee-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  employeeTypes: EmployeeType[] = [];
  formErrors: { [key: string]: string } = {};

  // Add a variable to hold the success message
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router // Inject the Router module
  ) {}


  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      employee_Type_ID: [0, Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      cell_Number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      physical_Address: ['', Validators.required],
      birthDate: ['', Validators.required],
      emergency_Contact_Name: ['', Validators.required],
      emergency_Contact_Cell: ['', Validators.required],
    });

    console.log('Initial form values:', this.addEmployeeForm.value);
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

  addEmployee(): void {
    console.log('addEmployee function triggered');
    if (this.addEmployeeForm.valid) {
      const employeeData = this.addEmployeeForm.value;

      // Convert employee_Type_ID to a number
      employeeData.employee_Type_ID = +employeeData.employee_Type_ID;

      console.log('Adding employee:', employeeData);

      this.dataService.addEmployee(employeeData).subscribe(
        (response) => {
          console.log('Add employee response:', response);

          // Update the success message with the response from the API
          this.successMessage = response;
          console.log('Success Message:', this.successMessage);

          // Clear the form after successful addition
          this.addEmployeeForm.reset();
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.addEmployeeForm.reset();
  }
}
