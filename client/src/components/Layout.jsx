import { Outlet } from "react-router-dom"

// Layout component to wrap nested routes
const Layout = () => {
    return (
        <main className="App">
            <Outlet />  {/* renders the matched child route */}
        </main>
    )
};

export default Layout;