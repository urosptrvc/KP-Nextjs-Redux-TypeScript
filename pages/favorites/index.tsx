import Link from "next/link";
import {useSelector} from 'react-redux';
import {Ad} from "@/lib/types/ad";
import {RootState} from "@/lib/store/store";
import {Star} from 'lucide-react';
import styles from "../../styles/Home.module.css";
import Header from "@/components/Header";
import AdList from "@/components/AdComponents/AdList";

interface FavoritesProps {
    ads: Ad[];
}

export default function Index({ads}: FavoritesProps) {
    const trackedAds = useSelector((state: RootState) => state.ads.trackedAds);
    const favoriteAds = ads.filter(ad => trackedAds.includes(ad.ad_id));

    return (
        <>
            <Header title={"Favorite ads"}/>
            {favoriteAds.length === 0 ? (
                <main className={styles.main}>
                    <div className={styles.empty}>
                        <Star size={48} className={styles.emptyIcon}/>
                        <h2>Niste zapratili nijedan oglas</h2>
                        <p>Klikom na zvezdicu zapracujete oglase</p>
                        <Link href="/" className={styles.backLink}>
                            Pretrazi oglase
                        </Link>
                    </div>
                </main>
            ) : (
                <AdList ads={favoriteAds}/>
            )}
        </>
    );
}

Index.getInitialProps = async () => {
    const res = await fetch("http://localhost:3000/api/ads");
    const ads: Ad[] = await res.json();
    return {ads};
};