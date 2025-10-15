class SelectOptionsDM {
    displayName: string;
    value: number;
    id: string;

    constructor(displayName: string, value: number,) {
        this.displayName = displayName,
            this.value = value,
            this.id = parseFloat(Math.random().toFixed(5)).toString()
    }
}


export default SelectOptionsDM