import {Ad} from "@/lib/types/ad";
import styles from "@/styles/AdView.module.css";
import Link from "next/link";
import AdCard from "@/components/AdComponents/AdCard";
import {AdImage} from "@/components/AdComponents/AdImage";

interface Props {
    ad: Ad;
}

export default function AdDetails({ad}: Props) {
    return (
        <main className={styles.main}>
            <div className={styles.arrow}>
                <Link className={styles.back} href="/">
                    &lt; Nazad na listu
                </Link>
            </div>
            <AdCard
                ad={ad}
                disabled={false}
            />

            <div className={styles.categorylocation}>
                <div className={styles.row}>
                    <div className={styles.label}>
                        Kategorija:
                    </div>
                    <div className={styles.value}>
                        {ad.category_name} &gt; {ad.group_name}
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>
                        Lokacija:
                    </div>
                     <div className={styles.value}>
                         {ad.location_name}
                     </div>
                </div>
            </div>
            <div className={styles.description}>
                Opis: {ad.description}
            </div>
            <div className={styles.gallery}>
                {ad.photo_path1 && (
                    <AdImage
                        imageUrl={`https://kupujemprodajem.com${ad.photo_path1}`}
                        style={{ objectFit: "contain" }}
                    />
                )}
            </div>
        </main>
    )
}