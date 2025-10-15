import type PersonDM from "../../../../models/dataModels/PersonDM";

export default function PersonDetails({person}: {person: PersonDM}) {

    return (
        <div className="px-2 py-1.5 rounded-md space-y-1 text-stone-800">
            <h3 className="font-bold">{person.displayName}</h3>
            <p>{person.birthDate}</p>
            <p>{person.description}</p>
            {/* Lista med "vilka träd är han med i?" */}
        </div>
    )

}

