import { Camera } from 'lucide-react';
import React, { useState } from 'react';
import styles from '../../styles/AdImage.module.css';

interface AdImageProps {
    imageUrl: string;
    style?: React.CSSProperties;
}

export const AdImage = ({ imageUrl, style }: AdImageProps) => {
    const [imageError, setImageError] = useState(!imageUrl);

    return (
        <>
            {imageError ? (
                <div className={styles.fallback}>
                    <Camera size={60} strokeWidth={1} />
                </div>
            ) : (
                <img
                    src={imageUrl}
                    alt=""
                    className={styles.image}
                    style={style}
                    onError={() => setImageError(true)}
                />
            )}
        </>
    );
};
