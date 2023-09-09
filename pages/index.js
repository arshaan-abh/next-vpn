import Feature from "../components/Landing/Feature"
import Packages from "../components/Landing/Packages";
import Hero from "../components/Landing/Hero"
import Layout from "../components/Landing/Layout/Layout"
import SeoHead from "../components/Landing/SeoHead"

export default function Index() {
    return (
			<>
				<SeoHead title="AragonVPN - Fast And Secure" />
				<Layout>
					<Hero />
					<Feature />
					<Packages />
				</Layout>
			</>
		);
}
