export function getCurrencySymbol (currency: string) {
    switch (currency) {
        case 'eur':
            return '€';
        case 'rsd':
            return 'din';
        default:
            return currency;
    }
}