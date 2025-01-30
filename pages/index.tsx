import { Ad } from "@/lib/types/ad";
import Header from "@/components/Header";
import AdList from "@/components/AdComponents/AdList";

interface HomeProps {
    ads: Ad[];
}
export default function Home({ ads }: HomeProps) {
    return (
        <>
            <Header title={"Oglasi"}/>
            <AdList ads={ads} />
        </>
    );
}

Home.getInitialProps = async () => {
    const res = await fetch("http://localhost:3000/api/ads");
    const ads: Ad[] = await res.json();
    return { ads };
};