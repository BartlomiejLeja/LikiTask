import { Frog } from './frog';

export class LakeField {
    public x: number;
    public y: number;
    public checked: boolean;
    public frog?: Frog;

    constructor(private xCordinate: number,
                private yCordinate: number,
                private frogInput?: Frog,
                private checkedInput = false,
            ){
        this.x = xCordinate;
        this.y = yCordinate;
        this.frog = frogInput;
        this.checked = checkedInput;
    }
}
