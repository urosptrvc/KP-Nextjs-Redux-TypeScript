import {Star} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/lib/store/store';
import {toggleTracking} from '@/lib/store/adSlice';
import styles from '../styles/TrackButton.module.css';
import {toast} from 'sonner';
import {Ad} from "@/lib/types/ad";

interface TrackButtonProps {
    ad: Ad;
    disabled: boolean;
}

export const TrackButton = ({ad, disabled}: TrackButtonProps) => {
    const dispatch = useDispatch();
    const trackedAds = useSelector((state: RootState) => state.ads.trackedAds);
    const isTracked = trackedAds.includes(ad.ad_id);

    const handleClick = (e: React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleTracking(ad.ad_id));

        if (!isTracked) {
            toast.success('Zapracen oglas ', {
                description: ad.name,
            });
        } else {
            toast.info('Otpratili ste oglas ', {
                description: ad.name,
            });
        }
    };

    return (
        <div className={styles.box}>
            <button
                onClick={handleClick}
                className={styles.trackButton}
                aria-label={isTracked ? 'Untrack advertisement' : 'Track advertisement'}
                disabled={disabled}

            >
                <Star
                    className={isTracked ? styles.tracked : styles.untracked}
                    size={22.5}
                    strokeWidth={1}
                />
            </button>
        </div>
    );
};
