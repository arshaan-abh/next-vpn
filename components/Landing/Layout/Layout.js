import React from "react"
import Footer from "./Footer"
import Header from "./Header";
import GetStartedHeader from "./GetStartedHeader";

const Layout = ({children, page}) => {
    return (<>
        {page === undefined ? <Header/> : page === "getStarted" ? <GetStartedHeader/> : <Header/>}
        {children}
        <Footer/>
    </>)
}

export default Layout
