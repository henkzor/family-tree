export default function HomePage() {

    return (
        <div>
            <div >
                <div className="flex justify-center">
                    <div className="w-sm">
                        <h1 className="font-bold mb-4">HomePage</h1>
                    </div>
                </div>
            </div>

            <p className="mb-12">Välkommen till släktträdet!</p>
            <div className="flex">
                <img className="mx-auto h-80" src='..\..\logo.png' alt="Tree" />
            </div>
        </div>
    )
}