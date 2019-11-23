import { Injectable } from '@angular/core';
import { LakeField } from '../model/lake-field';

@Injectable({
    providedIn: 'root',
})
export class FrogService {

    public checkIfMoveIsPossible(
            fieldFrom: LakeField,
            fieldTo: LakeField
        ): boolean {
            if(
                fieldFrom.frog.gender === 'male' && 
                fieldTo.y-fieldFrom.y<=3 && 
                fieldTo.x-fieldFrom.x<=3
            ){
                    return true;
            }else if (fieldFrom.frog.gender === 'female' && 
                fieldTo.y-fieldFrom.y<=2 && 
                fieldTo.x-fieldFrom.x<=2){
                    return true;
            }
            return false; 
    }

    public chceckIfReproduceIsPossible(
        fieldFrom: LakeField,
        fieldTo: LakeField
    ): boolean{
        if(
            fieldFrom.frog.gender !== fieldTo.frog.gender &&  
            Math.abs(fieldTo.y-fieldFrom.y)<=1 && 
            Math.abs(fieldTo.x-fieldFrom.x)<=1 )
        {
            return true
        }else{
            return false;
        }
    }

    public findFreeField(lake: LakeField[][],fieldFrom: LakeField, iteration: number)
    {
        //TODO handle situation when no free fields
        if(!lake[fieldFrom.x+iteration][fieldFrom.y+iteration].frog)
            return {x: fieldFrom.x+iteration, y:fieldFrom.y+iteration};
        if(!lake[fieldFrom.x][fieldFrom.y+iteration].frog)
            return {x: fieldFrom.x, y:fieldFrom.y+iteration};
        if(!lake[fieldFrom.x+iteration][fieldFrom.y].frog)
            return {x: fieldFrom.x+iteration, y:fieldFrom.y} 
        if(!lake[fieldFrom.x-iteration][fieldFrom.y-iteration].frog)
            return {x: fieldFrom.x-iteration, y:fieldFrom.y-iteration};
        if(!lake[fieldFrom.x][fieldFrom.y-iteration].frog)
            return {x: fieldFrom.x, y:fieldFrom.y-iteration};
        if(!lake[fieldFrom.x-iteration][fieldFrom.y].frog)
            return {x: fieldFrom.x-iteration, y:fieldFrom.y}; 
        if(!lake[fieldFrom.x-iteration][fieldFrom.y+iteration].frog)
            return { x: fieldFrom.x-iteration, y:fieldFrom.y+iteration };  
        if(!lake[fieldFrom.x+iteration][fieldFrom.y-iteration].frog)
            return { x: fieldFrom.x+iteration, y:fieldFrom.y-iteration };  
        return this.findFreeField(lake,fieldFrom,iteration+1);
    }
}
