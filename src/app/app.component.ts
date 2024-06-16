import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SelectionModel } from '@angular/cdk/collections';
interface Element {
  sno: number;
  task: string;
  type: string;
  desc: string;
  fqy: string;
  spare: string;
  qty: number;
  tool: string;
  mh: string;
  attachment: string;
  remarks: string;
}

const ELEMENT_DATA: Element[] = [  // Add more rows here as needed
];
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    FormsModule,
    MatSelectModule, 
    MatCheckboxModule,
    MatChipsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None 
})

export class AppComponent {
  date = new Date('2021-02-09');
  fleets: string[] = ['A320-212', 'A320-212N', 'B737-800', 'B777-300', 'A380-800'];
  selectedFleets: string[] = [];
  remarks: string = '';
  createsection=true;
  frequencyValue: number = 10000; // Initial value, you can change it as needed
  frequencyValue2: number = 20000; // Initial value, you can change it as needed
  frequencyValue3: number = 130000; // Initial value, you can change it as needed
  tcsAvl = false;
  tcsNAvl = false;
  mh = false;

  toggleTcsAvl() {
    this.tcsAvl = !this.tcsAvl;
  }

  toggleTcsNAvl() {
    this.tcsNAvl = !this.tcsNAvl;
  }

  toggleMh() {
    this.mh = !this.mh;
    if (this.mh) {
      this.displayedColumns = ['select', 'sno', 'task', 'type', 'desc', 'fqy', 'spare', 'qty', 'tool', 'mh', 'attachment', 'remarks'];
    } else {
      this.displayedColumns = ['select', 'sno', 'task', 'type', 'desc', 'fqy', 'spare', 'qty', 'tool', 'attachment', 'remarks'];
    }
  }
  regulators: { [key: string]: string[] } = {
    'A320-212': ['Regulator1', 'EASA'],
    'A320-212N': ['DGCA', 'FAA'],
    'B737-800': ['EASA', 'CAA'],
    'B777-300': ['DGCA', 'FAA'],
    'A380-800': ['EASA', 'CAA']
  };
  selectedRegulators: string[] = [];
  filteredRegulators: string[] = [];

  stations: { [key: string]: string[] } = {
    'A320-212': ['HYD', 'DEL'],
    'A320-212N': ['BLR', 'BOM'],
    'B737-800': ['DEL', 'BLR'],
    'B777-300': ['HYD', 'BOM'],
    'A380-800': ['DEL', 'HYD']
  };
  selectedStations: string[] = [];
  filteredStations: string[] = [];
  tasks: { [key: string]: string[] } ={
    'HYD': ['AMP', 'HYD-Task1', 'B777-Task1', 'HYD-B777-Task', 'A380-Task2', 'HYD-A380-Task'],
    'DEL': ['AMP-DEL', 'DEL-Task1', 'B737-Task1', 'DEL-B737-Task', 'A380-Task1', 'DEL-A380-Task'],
    'BLR': ['TCS', 'BLR-Task1', 'B737-Task2', 'BLR-B737-Task'],
    'BOM': ['TCS-BOM', 'BOM-Task1', 'B777-Task2', 'BOM-B777-Task']
  }

  // tasks: { [key: string]: { [key: string]: string[] } } = {
  //   'A320-212': {
  //     'HYD': ['AMP', 'HYD-Task1'],
  //     'DEL': ['AMP-DEL', 'DEL-Task1']
  //   },
  //   'A320-212N': {
  //     'BLR': ['TCS', 'BLR-Task1'],
  //     'BOM': ['TCS-BOM', 'BOM-Task1']
  //   },
  //   'B737-800': {
  //     'DEL': ['B737-Task1', 'DEL-B737-Task'],
  //     'BLR': ['B737-Task2', 'BLR-B737-Task']
  //   },
  //   'B777-300': {
  //     'HYD': ['B777-Task1', 'HYD-B777-Task'],
  //     'BOM': ['B777-Task2', 'BOM-B777-Task']
  //   },
  //   'A380-800': {
  //     'DEL': ['A380-Task1', 'DEL-A380-Task'],
  //     'HYD': ['A380-Task2', 'HYD-A380-Task']
  //   }
  // };
  selectedTasks: string[] = [];
  filteredTasks: string[] = [];
  frequencies: number[] = [12000, 10000, 24];
  displayedColumns: string[] = ['select', 'sno', 'task', 'type', 'desc', 'fqy', 'spare', 'qty', 'tool', 'mh', 'attachment', 'remarks'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  constructor() {
    this.filteredRegulators = this.regulators[this.fleets[0]];
    this.filteredStations = this.stations[this.fleets[0]];
    this.filteredTasks = this.tasks[this.stations[this.fleets[0]][0]];
    if (this.mh) {
      this.displayedColumns = ['select', 'sno', 'task', 'type', 'desc', 'fqy', 'spare', 'qty', 'tool', 'mh', 'attachment', 'remarks'];
    } else {
      this.displayedColumns = ['select', 'sno', 'task', 'type', 'desc', 'fqy', 'spare', 'qty', 'tool', 'attachment', 'remarks'];
    }
  }
clr(){
  this.filteredRegulators = this.regulators[this.fleets[0]];
  this.selectedTasks = [];
  this.selectedRegulators = [];
  this.selectedStations = [];
this.selectedFleets=[]
  this.filteredStations = this.stations[this.fleets[0]];
  this.filteredTasks = this.tasks[this.stations[this.fleets[0]][0]];
}
  onFleetChange() {
    this.filteredRegulators = [];
    this.filteredStations = [];
    this.filteredTasks = [];

    this.selectedFleets.forEach(fleet => {
      this.filteredRegulators = [...new Set([...this.filteredRegulators, ...this.regulators[fleet]])];
      this.filteredStations = [...new Set([...this.filteredStations, ...this.stations[fleet]])];
    });

    this.updateFilteredTasks();
  }

  onStationChange() {
    this.updateFilteredTasks();
  }

  updateFilteredTasks() {
    this.filteredTasks = [];
      this.selectedStations.forEach(station => {
        if (this.tasks[station]) {
          this.filteredTasks = [...new Set([...this.filteredTasks, ...this.tasks[station]])];
        }
      });
  }



  generate() {
    const newData: Element = {
      sno: this.dataSource.data.length + 1,
      task: `${this.selectedFleets.join(', ')} - ${this.selectedRegulators.join(', ')} - ${this.selectedStations.join(', ')} - ${this.selectedTasks.join(', ')}`,
      type: '',
      desc: '',
      fqy: '',
      spare: '',
      qty: 0,
      tool: '',
      mh: this.generateRandomString(6), // Generate 6 random characters
      attachment: '',
      remarks: ''
    };

    // Push the new data to the data source
    this.dataSource.data = [...this.dataSource.data, newData];
    this.createsection=false;
  }
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  selectAllRows() {
    this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.dataSource.data);
  }

  toggleSelection(row: Element) {
    this.selection.toggle(row);
  }

  deleteRow(element: Element) {
    this.dataSource.data = this.dataSource.data.filter(e => e !== element);
    this.createsection=true;

  }

  uploadFile(event: Event, element: Element) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      console.log(`File uploaded for ${element.task}:`, file.name);
      // Handle the file upload logic here
    }
  }
  editAttachment(event: Event, element: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFile = input.files[0];
      console.log(`Editing attachment for ${element.task}:`, newFile.name);
     element.attachment = newFile;
    }
  }
  deleteAttachment(element: any) {
    // Implement logic to delete attachment for the given element.
    element.attachment = null; // Assuming 'attachment' is the property holding the file reference.
    console.log(`Attachment deleted for ${element.task}`);
  }
  
  
  save() {
    this.clr();
    this.createsection=true;

    // Implement the logic to save the remarks
    console.log('Saving remarks:', this.remarks);
  }

  submit() {
        this.clr();

    this.createsection=true;

    // Implement the logic to submit the remarks
    console.log('Submitting remarks:', this.remarks);
  }

  approve() {
        this.clr();

    this.createsection=true;

    // Implement the logic to approve the remarks
    console.log('Approving remarks:', this.remarks);
  }
  currentRemark: string = '';
  currentElement: TaskData | null = null;
  private remarkModal: any;
  openRemarkModal(element: TaskData): void {
    this.currentElement = element;
    this.currentRemark = element.remarks;
    this.remarkModal = new bootstrap.Modal(document.getElementById('remarkModal'));
    this.remarkModal.show();
  }

  updateRemark(): void {
    if (this.currentElement) {
      this.currentElement.remarks = this.currentRemark;
      this.remarkModal.hide();
      this.currentElement = null;
      this.currentRemark = '';
    }
  }
}
export interface TaskData {
  sno: number;
  task: string;
  type: string;
  desc: string;
  fqy: string;
  spare: string;
  qty: string;
  tool: string;
  mh: string;
  attachment: string;
  remarks: string;
}
