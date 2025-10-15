class PersonDM {
    firstName: string;
    lastName: string;
    displayName: string;
    description: string;
    birthDate: string;
    id: string;
    relationLevel: number;
    relationPerson: string;
    relationType: string;
    treeId: string;

    constructor (firstName: string, lastName: string, description: string, birthDate: string, relationLevel: number, relationPerson: string,  relationType: string, treeId: string)
    {
        this.firstName = firstName,
        this.lastName = lastName,
        this.displayName = firstName + " " + lastName,
        this.description = description,
        this.birthDate = birthDate,
        this.id = parseFloat(Math.random().toFixed(5)).toString(),
        this.relationLevel = relationLevel,
        this.relationPerson = relationPerson,
        this.relationType = relationType,
        this.treeId = treeId
    }
}


export default PersonDM