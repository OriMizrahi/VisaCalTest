import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../services/data-services/animals.service';
import { AuthService } from '../services/auth.service';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { Animal } from '../models/Animal';
import { interval, Subscription } from 'rxjs';

const ELEMENT_DATA: Animal[] = [
  //{ name: "kjhjh", amount:  1},
  //{ name: "kjdfh", amount: 2 },
  //{ name: "kjhsdf", amount: 3 },
  //{ name: "kjdfgdfh", amount: 4 }
];

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  timeToRefrseh = interval(60000);//60 seconds
  subscription: Subscription;
  showServerErrorMessage = false;
  displayedColumns: string[] = ['name', 'amount', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private authService: AuthService, private animalService: AnimalService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAnimals();
    this.subscription = this.timeToRefrseh.subscribe(val => this.getAnimals());
  }



ngOnDestroy() {
  this.subscription.unsubscribe();
}

  getAnimals() {
    this.animalService.getAllAnimals()
      .subscribe(
        (resp) => {
          this.dataSource = resp;
        },
        (err) => {
          this.showServerErrorMessage = true;
        });
  }
  

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.authService.isLoggedIn()
  }




  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addOrUpdateRowData(result.data);
      } else if (result.event == 'Update') {
        this.addOrUpdateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addOrUpdateRowData(row_obj) {
    let animal = new Animal(row_obj.name, +row_obj.amount);

    this.animalService.addOrUpdateAnimal(animal)
      .subscribe(
        (resp) => {
          this.dataSource = resp;
        },
        (err) => {
          this.showServerErrorMessage = true;
        });
    this.table.renderRows();

  }
  //updateRowData(row_obj) {
  //  this.dataSource = this.dataSource.filter((value, key) => {
  //    if (value.name == row_obj.name) {
  //      value.amount = row_obj.amount;
  //    }
  //    return true;
  //  });
  //}
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.name != row_obj.name;
    });
  }
}

