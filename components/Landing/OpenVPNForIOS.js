import React, {useMemo} from "react";
import {motion} from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "/components/Landing/Layout/ScrollAnimationWrapper";
import styles from "../../styles/CustomStyles.module.css";
import Image from "next/future/image";
import iosOne from "/public/assets/ios-1.png";
import iosTwo from "/public/assets/ios-2.png";
import iosThree from "/public/assets/ios-3.png";
import iosFour from "/public/assets/ios-4.png";
import iosFiveOne from "/public/assets/ios-5.png";
import iosFiveTwo from "/public/assets/ios-5.png";
import iosSix from "/public/assets/ios-6.png";
import iosSeven from "/public/assets/ios-6.png";
import iosEight from "/public/assets/ios-6.png";

const OpenVPNForIOS = () => {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    return (
        <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="ios">
            <div
                className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
            >
                <div>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            1. Install the app&nbsp;
                            <a
                                className="text-orange-500"
                                href="https://apps.apple.com/app/openvpn-connect/id590379981"
                            >
                                OpenVPN Connect
                            </a>
                            .
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosOne} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            2. Open iTunes on your computer, connect your iPhone or iPad, click on "File Sharing" and
                            select "OpenVPN". Then click on "Add...".
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosTwo} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            3. Download the OpenVPN configuration file, unzip it and select the .ovpn file. Then click
                            on "Add".
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosThree} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            4. Install the profile in OpenVPN Connect, for that click on the green plus button.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosFour} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            5. Enter your login credentials and click on the "Add" button. Optionally you can save your
                            password.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosFiveOne} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            A dialog window will open asking you to allow the OpenVPN iOS application to add a VPN
                            configuration to the system. This is a default warning message advising you that your
                            network connection will be redirected over the VPN and you can safely tap "Allow".
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosFiveTwo} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            6. When activating the connection, a dialog window will ask you to confirm that you want to
                            enable the connection to VPN. Confirm with "Yes".
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosSix} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            7. If connection has been successfully established, the status is shown in the menu bar. You
                            can manage your VPN connection with the OpenVPN app.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosSeven} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            8. Afterwards you can easily access that profile by clicking on "OVPN Profile" in "OpenVPN
                            Connect" app.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={iosEight} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                </div>
            </div>
        </div>
    );
};

export default OpenVPNForIOS;
