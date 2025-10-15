import { useParams } from "react-router-dom";
import PersonForm from "../../components/Persons/PersonForm";

export default function NewPersonPage() {

    const params = useParams()

    return (
        <>
            <PersonForm method='post' treeId={params.treeId? params.treeId: undefined} />
        </>
    )

}