class TreeDM {
    title: string;
    description: string;
    id: string;

    constructor (title: string, description: string, )
    {
        this.title = title,
        this.description = description,
        this.id = parseFloat(Math.random().toFixed(5)).toString()
    }
}


export default TreeDM