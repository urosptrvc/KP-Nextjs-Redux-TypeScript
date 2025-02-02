import styles from "@/styles/AdView.module.css";
import { TrackButton } from "@/components/TrackButton";
import { Ad } from "@/lib/types/ad";
import { getCurrencySymbol } from "@/lib/utils/helpers";
import AdImage from "@/components/AdComponents/AdImage";

interface AdMainProps {
    ad: Ad;
    disabled: boolean;
    error?: {
        error_code: string;
    };
}

export default function AdCard({ ad, disabled, error }: AdMainProps) {

    const content = error?.error_code === "ad_deleted" ? (
        <p className={styles.deleted}>Oglas je obrisan</p>
    ) : (
        <>
            <div>{ad.name}</div>
            <div>
                {ad.price ? `${ad.price} ${getCurrencySymbol(ad.currency)}` : "Kontakt"}
            </div>
        </>
    );

    return (
        <div className={styles.ad}>
            <div className={styles.imageContainer}>
                <AdImage
                    key={ad.ad_id}
                    imageUrl={`https://kupujemprodajem.com${ad.photo1_tmb_300x300}`}
                    style={{objectFit: "fill"}}
                />
            </div>
            <div className={styles.content}>{content}</div>
            <TrackButton ad={ad} disabled={disabled}/>
        </div>
    );
}