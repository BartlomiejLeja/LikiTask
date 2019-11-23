export class LakeField {
    public characteristics: [];
    public x: number;
    public y: number;
    public gender: string;
    public checked: boolean;

    constructor(private xCordinate: number,
                private yCordinate: number,
                private frogGender: string,
                private checkedInput = false,
                private frogcharacteristics?: []){
        this.x = xCordinate;
        this.y = yCordinate;
        this.gender = frogGender;
        this.characteristics = frogcharacteristics;
        this.checked = checkedInput;
    }
}