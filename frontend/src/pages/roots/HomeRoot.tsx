import { Outlet } from "react-router-dom"
import MainNavigation from "../../components/Navigation/MainNavigation.tsx"

export default function HomeRootLayout() {

    return (
        <div className="text-center">
            <MainNavigation />
            <Outlet />
        </div>
    )

}