import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_TOP } from "data/navigation";

function Navbar() {
    return (
        <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
            {NAVIGATION_TOP.map((item) => (
                <NavigationItem key={item.id} menuItem={item} />
            ))}
        </ul>
    );
}

export default Navbar;