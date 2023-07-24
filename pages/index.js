import Feature from "components/Landing/Feature"
import Pricing from "components/Landing/Pricing"
import Hero from "components/Landing/Hero"
import Layout from "components/Landing/Layout/Layout"
import SeoHead from "components/Landing/SeoHead"

export default function Index() {
    return (<>
        <SeoHead title="LaslesVPN Landing Page"/>
        <Layout>
            <Hero/>
            <Feature/>
            <Pricing/>
        </Layout>
    </>)
}
