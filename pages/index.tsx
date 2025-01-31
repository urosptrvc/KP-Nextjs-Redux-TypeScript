import { Ad } from "@/lib/types/ad";
import Header from "@/components/Header";
import AdList from "@/components/AdComponents/AdList";
import {GetStaticProps} from "next";

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

export const getStaticProps: GetStaticProps = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/ads");
        const ads: Ad[] = await res.json();

        return {
            props: { ads },
            revalidate: 60,
        };
    } catch (error) {
        console.error('Failed to fetch ads:', error);
        return {
            props: { ads: [] },
        };
    }
};