import React, {useMemo} from "react";
import {motion} from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "/components/Landing/Layout/ScrollAnimationWrapper";
import styles from "../../styles/CustomStyles.module.css";

const OpenVPNForIOS = () => {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    return (<div
        className="max-w-screen-xl mt-0 mb-6 sm:mt-8 sm:mb-8 px-6 sm:px-8 lg:px-16 mx-auto"
        id="ios">
        <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p y-8">
            <ScrollAnimationWrapper className="flex w-full justify-end">
                <motion.div
                    className={`w-full relative overflow-hidden p-4 ${styles.playercontainer}`}
                    variants={scrollAnimation}>

                </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
                <motion.div
                    className="flex flex-col justify-center items-center ml-auto w-full h-full lg:w-9/12"
                    variants={scrollAnimation}>

                </motion.div>
            </ScrollAnimationWrapper>
        </div>
    </div>);
};

export default OpenVPNForIOS;
