import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

// Can use '/hosted-checkout' for stripe checkout


export const Navbar = () => {
    return (
    <div className="navbar bg-base-100 text-base-content">
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-base-content text-xl">Scrum Dashboard</Link>
        </div>
        <div className="flex-none gap-2">
            <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                <Link href='/profile' className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </Link>
                </li>
                <li><ThemeToggle /></li>
                <li><Link href='/api/auth/logout'>Logout</Link></li>
            </ul>
            </div>
        </div>
    </div>
    )
}

