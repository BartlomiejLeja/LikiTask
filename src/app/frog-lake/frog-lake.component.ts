import { Component, OnInit } from '@angular/core';
import { LakeField } from '../model/lake-field';
import { FrogService } from '../services/frog.service';
import { Frog } from '../model/frog';

@Component({
  selector: 'app-frog-lake',
  templateUrl: './frog-lake.component.html',
  styleUrls: ['./frog-lake.component.css']
})
export class FrogLakeComponent implements OnInit {
  public lake = [
    [
      new LakeField(0,0, new Frog( 'male' ,[ 'tall' , 'fat' ])),
      new LakeField(0,1,new Frog('female',['short','slim'])),
      new LakeField(0,2,),
      new LakeField(0,3,),
      new LakeField(0,4,),
      new LakeField(0,5,),
      new LakeField(0,6,),
      new LakeField(0,7,),
      new LakeField(0,8,),
      new LakeField(0,9,)
    ],
    [
      new LakeField(1,0,),
      new LakeField(1,1,),
      new LakeField(1,2,),
      new LakeField(1,3,),
      new LakeField(1,4,),
      new LakeField(1,5,),
      new LakeField(1,6,),
      new LakeField(1,7,),
      new LakeField(1,8,),
      new LakeField(1,9,)
    ],
    [
      new LakeField(2,0,),
      new LakeField(2,1,),
      new LakeField(2,2,),
      new LakeField(2,3,),
      new LakeField(2,4,),
      new LakeField(2,5,),
      new LakeField(2,6,),
      new LakeField(2,7,),
      new LakeField(2,8,),
      new LakeField(2,9,)
    ],
    [
      new LakeField(3,0,),
      new LakeField(3,1,),
      new LakeField(3,2,),
      new LakeField(3,3,),
      new LakeField(3,4),
      new LakeField(3,5,),
      new LakeField(3,6,),
      new LakeField(3,7,),
      new LakeField(3,8,),
      new LakeField(3,9,)
    ],
    [
      new LakeField(4,0,),
      new LakeField(4,1,),
      new LakeField(4,2,),
      new LakeField(4,3,),
      new LakeField(4,4,),
      new LakeField(4,5,),
      new LakeField(4,6,),
      new LakeField(4,7),
      new LakeField(4,8,),
      new LakeField(4,9,)
    ],
    [
      new LakeField(5,0,),
      new LakeField(5,1,),
      new LakeField(5,2,),
      new LakeField(5,3,),
      new LakeField(5,4,),
      new LakeField(5,5,),
      new LakeField(5,6,),
      new LakeField(5,7,),
      new LakeField(5,8,),
      new LakeField(5,9,)
    ],
  ];

  private isFirstSelected = false;
  private fieldFrom: LakeField;
  private fieldTo: LakeField;

  constructor(private frogService: FrogService) { }

  ngOnInit() {
  }
 
 public handleClick($event, lakeField: LakeField): void{
    this.lake[lakeField.x][lakeField.y].checked = $event.currentTarget.checked;
    if($event.currentTarget.checked && !this.isFirstSelected && lakeField.frog){
      this.fieldFrom = new LakeField(lakeField.x,lakeField.y, lakeField.frog);
      this.isFirstSelected = true;
    }else if ($event.currentTarget.checked && this.isFirstSelected) {
      if(lakeField.frog){
        this.fieldTo = new LakeField(lakeField.x,lakeField.y,lakeField.frog);
      }else{
        this.fieldTo = new LakeField(lakeField.x,lakeField.y);
      }
     
      this.isFirstSelected = false;
    }
  }

  public jump(): void{
    if(this.frogService.checkIfMoveIsPossible(this.fieldFrom,this.fieldTo) && this.fieldTo.frog === undefined){
      this.lake[this.fieldTo.x][this.fieldTo.y].frog = this.fieldFrom.frog;
      this.lake[this.fieldFrom.x][this.fieldFrom.y].frog = null;
      this.isFirstSelected = false;
      this.clearLake();
    }
    else if(this.fieldTo.frog && this.fieldTo.frog.gender !== 'none'){
      alert('You can t move a frog to another frog');
      this.clearLake();
    } else {
      alert('You can t move a frog so far');
      this.clearLake();
    }
  }

  public reproduce(): void{
    const isReproduceIsPossible = 
      this.frogService.chceckIfReproduceIsPossible(this.fieldFrom, this.fieldTo)
      let coordinates;
      if(isReproduceIsPossible) {
        if(this.fieldFrom.frog.gender==='female'){
          coordinates = this.frogService.findFreeField(this.lake,this.fieldFrom,1)
        }else if (this.fieldTo.frog.gender ==='female'){
          coordinates = this.frogService.findFreeField(this.lake,this.fieldFrom,1)
        }
        this.lake[coordinates.x][coordinates.y].frog = new Frog('female',
        [this.fieldFrom.frog.characteristics[0],this.fieldTo.frog.characteristics[1]]);
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
