import { Injectable } from '@angular/core';
import { LakeField } from '../model/lake-field';

@Injectable({
    providedIn: 'root',
})
export class FrogService {

    public checkIfMoveIsPossible(
            xFrom: number, 
            yFrom: number, 
            xTo: number, 
            yTo: number,
            gender: string
        ): boolean {
            if(
                gender === 'male' && 
                yTo-yFrom<=3 && 
                xTo-xFrom<=3
            ){
                    return true;
            }else if (gender === 'female' && 
                yTo-yFrom<=2 && 
                xTo-xFrom<=2){
                    return true;
            }
            return false; 
    }

    public chceckIfReproduceIsPossible(
        fieldFrom: LakeField,
        fieldTo: LakeField
    ): boolean{
        if(
            fieldFrom.frog.gender!=fieldTo.frog.gender &&  
            Math.abs(fieldTo.y-fieldFrom.y)<=1 && 
            Math.abs(fieldTo.x-fieldFrom.x)<=1 )
        {
            return true
        }else{
            return false;
        }
    }

    public findFreeField(lake: LakeField[][],fieldFrom: LakeField,number : number)
    {
        //TODO handle situation when no free fields
        if(!lake[fieldFrom.x+number][fieldFrom.y+number].frog)
            return {x: fieldFrom.x+number, y:fieldFrom.y+number}
        if(!lake[fieldFrom.x][fieldFrom.y+number].frog)
            return {x: fieldFrom.x, y:fieldFrom.y+number}
        if(!lake[fieldFrom.x+number][fieldFrom.y].frog)
            return {x: fieldFrom.x+number, y:fieldFrom.y} 
        if(!lake[fieldFrom.x-number][fieldFrom.y-number].frog)
            return {x: fieldFrom.x-number, y:fieldFrom.y-number}
        if(!lake[fieldFrom.x][fieldFrom.y-number].frog)
            return {x: fieldFrom.x, y:fieldFrom.y-number}
        if(!lake[fieldFrom.x-number][fieldFrom.y].frog)
            return {x: fieldFrom.x-number, y:fieldFrom.y}  
        if(!lake[fieldFrom.x-number][fieldFrom.y+number].frog)
            return {x: fieldFrom.x-number, y:fieldFrom.y+number}  
        if(!lake[fieldFrom.x+number][fieldFrom.y-number].frog)
            return {x: fieldFrom.x+number, y:fieldFrom.y-number}  
        return this.findFreeField(lake,fieldFrom,number+1)
    }
}