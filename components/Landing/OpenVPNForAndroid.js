import React, {useMemo} from "react";
import {motion} from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "/components/Landing/Layout/ScrollAnimationWrapper";
import styles from "../../styles/CustomStyles.module.css";
import Image from "next/future/image";
import androidOne from "/public/assets/android-1.png";
import androidTwo from "/public/assets/android-2.png";
import androidThree from "/public/assets/android-3.png";
import androidFour from "/public/assets/android-4.png";
import androidFive from "/public/assets/android-5.png";
import androidSix from "/public/assets/android-6.png";

const OpenVPNForAndroid = () => {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    return (
        <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="android">
            <div
                className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
            >
                <div></div>
                <div>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            1. <b>Important:</b> OpenVPN only works with Android 4 and above.<br/>
                            Install the app&nbsp;
                            <a
                                className="text-orange-500"
                                href="https://play.google.com/store/apps/details?id=de.blinkt.openvpn&hl=en"
                            >
                                OpenVPN for Android
                            </a>
                            , launch it and click on the folder button in the right corner at the bottom.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={androidOne} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            2. Download the OpenVPN configuration file, unzip it and copy the folder to your smartphone.
                            Select the .ovpn file and confirm with Select.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={androidTwo} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            3. Click on the Save button.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={androidThree} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            4. Select the location to establish a VPN connection.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={androidFour} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            5. Enter your hide.me login credentials.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={androidFive} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            6. If connection has been successfully established, the status is shown in the menu bar. You
                            can manage your VPN connection with the OpenVPN app.
                        </motion.div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper>
                        <motion.div variants={scrollAnimation}>
                            <Image src={androidSix} className={styles.fullImage} alt="..."/>
                        </motion.div>
                    </ScrollAnimationWrapper>
                </div>
            </div>
        </div>
    );
};

export default OpenVPNForAndroid;
