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
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
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
  frequencyValue: number = 10000; // Initial value, you can change it as needed
  frequencyValue2: number = 20000; // Initial value, you can change it as needed
  frequencyValue3: number = 130000; // Initial value, you can change it as needed

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

  tasks: { [key: string]: { [key: string]: string[] } } = {
    'A320-212': {
      'HYD': ['AMP', 'HYD-Task1'],
      'DEL': ['AMP-DEL', 'DEL-Task1']
    },
    'A320-212N': {
      'BLR': ['TCS', 'BLR-Task1'],
      'BOM': ['TCS-BOM', 'BOM-Task1']
    },
    'B737-800': {
      'DEL': ['B737-Task1', 'DEL-B737-Task'],
      'BLR': ['B737-Task2', 'BLR-B737-Task']
    },
    'B777-300': {
      'HYD': ['B777-Task1', 'HYD-B777-Task'],
      'BOM': ['B777-Task2', 'BOM-B777-Task']
    },
    'A380-800': {
      'DEL': ['A380-Task1', 'DEL-A380-Task'],
      'HYD': ['A380-Task2', 'HYD-A380-Task']
    }
  };
  selectedTasks: string[] = [];
  filteredTasks: string[] = [];
  frequencies: number[] = [12000, 10000, 24];

displayedColumns: string[] = ['sno', 'task', 'type', 'desc', 'fqy', 'spare', 'qty', 'tool', 'mh', 'attachment', 'remarks'];
  dataSource: TaskData[] = [
    { sno: 1, task: '32-05-07-400-A', type: '', desc: '', fqy: '', spare: '', qty: '', tool: '', mh: '', attachment: '', remarks: '' }
  ];
  constructor() {
    this.filteredRegulators = this.regulators[this.fleets[0]];
    this.filteredStations = this.stations[this.fleets[0]];
    this.filteredTasks = this.tasks[this.fleets[0]][this.stations[this.fleets[0]][0]];
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
    this.selectedFleets.forEach(fleet => {
      this.selectedStations.forEach(station => {
        if (this.tasks[fleet] && this.tasks[fleet][station]) {
          this.filteredTasks = [...new Set([...this.filteredTasks, ...this.tasks[fleet][station]])];
        }
      });
    });
  }


  generate() {
    const newData: TaskData = {
      sno: this.dataSource.length + 1,
      task: `${this.selectedFleets.join(', ')} - ${this.selectedRegulators.join(', ')} - ${this.selectedStations.join(', ')} - ${this.selectedTasks.join(', ')}`,
      type: '',
      desc: '',
      fqy: '',
      spare: '',
      qty: '',
      tool: '',
      mh: '',
      attachment: '',
      remarks: ''
    };
    this.dataSource.push(newData);
    this.dataSource = [...this.dataSource]; // Refresh the table
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
