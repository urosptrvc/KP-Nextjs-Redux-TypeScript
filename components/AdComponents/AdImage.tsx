'use client';

import { Camera } from 'lucide-react';
import { CSSProperties, useState, useEffect } from 'react';
import styles from '@/styles/AdImage.module.css';

interface AdImageProps {
    imageUrl: string;
    style?: CSSProperties;
}

export default function AdImage({ imageUrl, style }: AdImageProps) {
    const [hasError, setHasError] = useState(false);
    const [imgKey, setImgKey] = useState(0);

    useEffect(() => {
        setHasError(false);
        setImgKey(prev => prev + 1);
    }, [imageUrl]);

    if (hasError) {
        return (
            <div className={styles.fallback}>
                <Camera size={60} strokeWidth={1} />
            </div>
        );
    }

    return (
        <img
            key={imgKey}
            src={imageUrl}
            alt="Ad image"
            className={styles.image}
            onError={() => setHasError(true)}
            style={style}
        />
    );
};