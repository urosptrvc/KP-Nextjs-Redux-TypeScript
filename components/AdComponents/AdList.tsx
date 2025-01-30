import { Ad } from "@/lib/types/ad";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import AdCard from "@/components/AdComponents/AdCard";

interface AdListProps {
    ads: Ad[];
}

export default function AdList({ ads }: AdListProps) {
    const router = useRouter();

    const handleAdClick = (ad_id: number) => {
        router.push(`/ads/${ad_id}`);
    };

    return (
        <section className={styles.main}>
            {ads.map((ad) => (
                <div
                    key={ad.ad_id}
                    className={styles.ad}
                    onClick={() => handleAdClick(ad.ad_id)}
                >
                    <AdCard
                        ad={ad}
                        disabled={false}
                    />
                </div>
            ))}
        </section>
    );
};