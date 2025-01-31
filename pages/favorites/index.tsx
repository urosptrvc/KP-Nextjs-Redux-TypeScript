import Link from "next/link";
import {useSelector} from 'react-redux';
import {RootState} from "@/lib/store/store";
import {Star} from 'lucide-react';
import styles from "../../styles/Home.module.css";
import Header from "@/components/Header";
import AdList from "@/components/AdComponents/AdList";

export default function Favorites() {
    const trackedAds = useSelector((state: RootState) => state.ads.trackedAds);
    const favoriteAds = Object.values(trackedAds);

    return (
        <>
            <Header title={"Zapraceni oglasi"}/>
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