import styles from "@/styles/AdView.module.css";
import {TrackButton} from "@/components/TrackButton";
import {Ad} from "@/lib/types/ad";
import {getCurrencySymbol} from "@/lib/utils/helpers";

interface AdMainProps {
    ad: Ad
    disabled: boolean
}

export default function AdCard({ad, disabled}: AdMainProps) {
    return (
        <div className={styles.ad}>
            <div className={styles.imageContainer}>
                <img
                    src={`https://kupujemprodajem.com${ad.photo1_tmb_300x300}`}
                    alt=""
                    className={styles.image}
                    onError={(e) => e.currentTarget.src = "/noimage.jpg"}
                />
            </div>
            <div className={styles.content}>
                {ad.name == "Oglas je obrisan" ? (
                    <div className={styles.deleted}>{ad.name}</div>
                ) : (
                    <>
                        <div>
                            {ad.name}
                        </div>
                        <div>
                            {ad.price ? `${ad.price} ${getCurrencySymbol(ad.currency)}` : "Kontakt"}
                        </div>
                    </>
                )}
            </div>
            <TrackButton ad={ad} disabled={disabled}/>
        </div>
    )
}