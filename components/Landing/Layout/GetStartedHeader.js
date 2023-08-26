import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Link as LinkScroll} from "react-scroll";
import ButtonOutlined from "../misc/ButtonOutlined";
import styles from "../../../styles/CustomStyles.module.css";
import {useRouter} from "next/router";
import Image from "next/image";
import {getLocalStorageItem} from "../../../utils/handleLocalStorage";

const Header = () => {
    const [activeLink, setActiveLink] = useState(null);
    const [scrollActive, setScrollActive] = useState(false);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrollActive(window.scrollY > 20);
        });
        setToken(getLocalStorageItem("roletoken"));
        const tempRole = getLocalStorageItem("role");
        setRole(tempRole === "user" ? "" : tempRole);
    }, []);
    const router = useRouter();

    return (<>
        <header
            className={styles.header + " fixed top-0 w-full bg-white-500 z-30 transition pt-4 " + (scrollActive ? styles.stick : "")}>
            <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex flex-row justify-between py-3 sm:py-4">
                <div className="col-start-1 col-end-2 flex items-center">
                    <Image
                        src="/assets/logo.svg"
                        alt="logo"
                        height={36}
                        width={140}
                    />
                </div>
                <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500 items-center">
                    <ButtonOutlined
                        onClick={() => router.push("/")}
                        filled>
                        Back to Home
                    </ButtonOutlined>
                    <LinkScroll
                        activeClass="active"
                        to="windows"
                        spy={true}
                        smooth={true}
                        duration={1000}
                        onSetActive={() => {
                            setActiveLink("windows");
                        }}
                        className={"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" + (activeLink === "windows" ? " text-orange-500 animation-active " : " text-black-500 hover:text-orange-500 a")}>
                        Windows
                    </LinkScroll>
                    <LinkScroll
                        activeClass="active"
                        to="android"
                        spy={true}
                        smooth={true}
                        duration={1000}
                        onSetActive={() => {
                            setActiveLink("android");
                        }}
                        className={"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" + (activeLink === "android" ? " text-orange-500 animation-active " : " text-black-500 hover:text-orange-500")}>
                        Android
                    </LinkScroll>
                    <LinkScroll
                        activeClass="active"
                        to="ios"
                        spy={true}
                        smooth={true}
                        duration={1000}
                        onSetActive={() => {
                            setActiveLink("ios");
                        }}
                        className={"px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" + (activeLink === "ios" ? " text-orange-500 animation-active " : " text-black-500 hover:text-orange-500")}>
                        IOS
                    </LinkScroll>
                </ul>
                <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
                    {token === null ? <>
                        <Link href="/auth/login">
                            <a className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                                Sign In
                            </a>
                        </Link>
                        <ButtonOutlined onClick={() => router.push("/auth/register")}>
                            Sign Up
                        </ButtonOutlined>
                    </> : <ButtonOutlined onClick={() => router.push(`/panel/${role}`)}>Dashboard</ButtonOutlined>}
                </div>
            </nav>
        </header>
        {/* Mobile Navigation */}
        <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
            <div className="bg-white-500 sm:px-3">
                <ul className="flex w-full justify-between items-center text-black-500">
                    <div
                        onClick={() => router.push("/")}
                        className={"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-orange-500 text-orange-500"}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                        </svg>
                        Back to Home
                    </div>
                    <LinkScroll
                        activeClass="active"
                        to="windows"
                        spy={true}
                        smooth={true}
                        duration={1000}
                        onSetActive={() => {
                            setActiveLink("windows");
                        }}
                        className={"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " + (activeLink === "windows" ? "  border-orange-500 text-orange-500" : " border-transparent")}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Windows
                    </LinkScroll>
                    <LinkScroll
                        activeClass="active"
                        to="android"
                        spy={true}
                        smooth={true}
                        duration={1000}
                        onSetActive={() => {
                            setActiveLink("android");
                        }}
                        className={"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " + (activeLink === "android" ? " border-orange-500 text-orange-500" : " border-transparent")}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Android
                    </LinkScroll>
                    <LinkScroll
                        activeClass="active"
                        to="ios"
                        spy={true}
                        smooth={true}
                        duration={1000}
                        onSetActive={() => {
                            setActiveLink("ios");
                        }}
                        className={"mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " + (activeLink === "ios" ? "  border-orange-500 text-orange-500" : " border-transparent")}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        IOS
                    </LinkScroll>
                </ul>
            </div>
        </nav>
        {/* End Mobile Navigation */}
    </>);
};

export default Header;
