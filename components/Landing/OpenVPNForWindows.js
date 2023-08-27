import React, {useMemo} from "react";
import {motion} from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "/components/Landing/Layout/ScrollAnimationWrapper";
import styles from "../../styles/CustomStyles.module.css";
import Image from "next/future/image";
import windowsOne from "/public/assets/windows-1.png";
import windowsTwo from "/public/assets/windows-2.png";
import windowsThree from "/public/assets/windows-3.png";
import windowsFour from "/public/assets/windows-4.png";
import windowsFive from "/public/assets/windows-5.png";
import windowsSix from "/public/assets/windows-6.png";

const OpenVPNForWindows = () => {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    return (
        <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="windows">
            <div
                className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
            >
                <div>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>1. Download the official&nbsp;
                            <a className="text-orange-500" href="https://openvpn.net/community-downloads/">
                                OpenVPN Client
                            </a>.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={windowsOne} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            2. Run the setup with administrator privileges and follow the installation steps. Confirm
                            the Windows security messages.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={windowsTwo} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            3. Download the configuration file and unzip it. If you want to store your login information
                            permanently, you have to edit the file userpass.txt and enter your hide.me login information
                            there. Copy all files to the OpenVPN configuration folder (by default C:/Program
                            Files/OpenVPN/config/) and confirm the Windows security messages.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={windowsThree} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            4. Click with right on the OpenVPN desktop icon, click on "Settings" and go to the tab
                            "Compatibility". Check "Run the program as administrator".
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={windowsFour} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            5. Start OpenVPN with administrator privileges and click with right on the OpenVPN tray
                            icon, select your favorite location and click on "Connect".
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={windowsFive} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            6. Once the connection has been successfully established, the OpenVPN icon turns green. You
                            can manage your VPN connection with OpenVPN.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={windowsSix} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                </div>
            </div>
        </div>
    );
};

export default OpenVPNForWindows;
