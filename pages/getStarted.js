import SeoHead from "../components/Landing/SeoHead";
import Layout from "../components/Landing/Layout/Layout";
import OpenVPNForWindows from "../components/Landing/OpenVPNForWindows";
import OpenVPNForAndroid from "../components/Landing/OpenVPNForAndroid";
import OpenVPNForIOS from "../components/Landing/OpenVPNForIOS";
import OpenVPNCopyWrite from "../components/Landing/OpenVPNCopyWrite";

export default function GetStarted() {
    return <>
        <SeoHead title="AragonVPN - Get Started"/>
        <Layout page="getStarted">
            <OpenVPNForWindows/>
            <OpenVPNForAndroid/>
            <OpenVPNForIOS/>
            <OpenVPNCopyWrite/>
        </Layout>
    </>
}
