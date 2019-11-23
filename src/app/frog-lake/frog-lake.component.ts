import { Component, OnInit } from '@angular/core';
import { LakeField } from '../model/lake-field';
import { FrogService } from '../services/frog.service';

@Component({
  selector: 'app-frog-lake',
  templateUrl: './frog-lake.component.html',
  styleUrls: ['./frog-lake.component.css']
})
export class FrogLakeComponent implements OnInit {

  
  private isFirstSelected = false;
  private fieldFrom: LakeField;
  private fieldTo: LakeField;

  constructor(private frogService: FrogService) { }

  ngOnInit() {
  }

  public lake = [
    [
      new LakeField(0,0,'male'),
      new LakeField(0,1,'female'),
      new LakeField(0,2,'none'),
      new LakeField(0,3,'none'),
      new LakeField(0,4,'none'),
      new LakeField(0,5,'none'),
      new LakeField(0,6,'none'),
      new LakeField(0,7,'none'),
      new LakeField(0,8,'none'),
      new LakeField(0,9,'none')
    ],
    [
      new LakeField(1,0,'none'),
      new LakeField(1,1,'none'),
      new LakeField(1,2,'none'),
      new LakeField(1,3,'none'),
      new LakeField(1,4,'none'),
      new LakeField(1,5,'none'),
      new LakeField(1,6,'none'),
      new LakeField(1,7,'none'),
      new LakeField(1,8,'none'),
      new LakeField(1,9,'none')
    ],
    [
      new LakeField(2,0,'none'),
      new LakeField(2,1,'none'),
      new LakeField(2,2,'none'),
      new LakeField(2,3,'none'),
      new LakeField(2,4,'none'),
      new LakeField(2,5,'none'),
      new LakeField(2,6,'none'),
      new LakeField(2,7,'none'),
      new LakeField(2,8,'none'),
      new LakeField(2,9,'none')
    ],
    [
      new LakeField(3,0,'none'),
      new LakeField(3,1,'none'),
      new LakeField(3,2,'none'),
      new LakeField(3,3,'none'),
      new LakeField(3,4,'none'),
      new LakeField(3,5,'none'),
      new LakeField(3,6,'none'),
      new LakeField(3,7,'none'),
      new LakeField(3,8,'none'),
      new LakeField(3,9,'none')
    ],
    [
      new LakeField(4,0,'none'),
      new LakeField(4,1,'none'),
      new LakeField(4,2,'none'),
      new LakeField(4,3,'none'),
      new LakeField(4,4,'none'),
      new LakeField(4,5,'none'),
      new LakeField(4,6,'none'),
      new LakeField(4,7,'none'),
      new LakeField(4,8,'none'),
      new LakeField(4,9,'none')
    ],
    [
      new LakeField(5,0,'none'),
      new LakeField(5,1,'none'),
      new LakeField(5,2,'none'),
      new LakeField(5,3,'none'),
      new LakeField(5,4,'none'),
      new LakeField(5,5,'none'),
      new LakeField(5,6,'none'),
      new LakeField(5,7,'none'),
      new LakeField(5,8,'none'),
      new LakeField(5,9,'none')
    ],
  ];

 public handleClick($event, frog: LakeField): void{
    this.lake[frog.x][frog.y].checked = $event.currentTarget.checked;
    if($event.currentTarget.checked && !this.isFirstSelected && frog.gender !== 'none'){
      this.fieldFrom = new LakeField(frog.x,frog.y,frog.gender);
      this.isFirstSelected = true;
    }else if ($event.currentTarget.checked && this.isFirstSelected) {
      this.fieldTo = new LakeField(frog.x,frog.y,frog.gender);
      this.isFirstSelected = false;
    }
  }

  public jumup(): void{
    if(this.frogService.checkIfMoveIsPossible(this.fieldFrom.x,this.fieldFrom.y, this.fieldTo.x,this.fieldTo.y,this.fieldFrom.gender) && this.fieldTo.gender == 'none'){
      this.lake[this.fieldTo.x][this.fieldTo.y].gender = this.fieldFrom.gender;
      this.lake[this.fieldFrom.x][this.fieldFrom.y].gender = 'none';
      this.isFirstSelected = false;
      this.clearLake();
    }
    else if(this.fieldTo.gender !== 'none'){
      alert("You can't move a frog to another frog");
    } else {
      alert("You can't move a frog so far");
    }
  }

  public reproduce(): void{
    const isReproduceIsPossible = 
      this.frogService.chceckIfReproduceIsPossible(this.fieldFrom, this.fieldTo)
      let coordinates;
      if(isReproduceIsPossible) {
        if(this.fieldFrom.gender==='female'){
          coordinates = this.frogService.findFreeField(this.lake,this.fieldFrom,1)
        }else if (this.fieldTo.gender ==='female'){
          coordinates = this.frogService.findFreeField(this.lake,this.fieldFrom,1)
        }
        this.lake[coordinates.x][coordinates.y].gender = 'female';
        this.clearLake();
      }
  }

  private clearLake(): void {
    this.lake.forEach((arayOfArrays)=>{
      arayOfArrays.forEach((array)=>{
        array.checked = false;
      })
    })
  }

}
