export const rateLimit = ({
                              interval,
                              uniqueTokenPerInterval = 500,
                          }: {
    interval: number;
    uniqueTokenPerInterval?: number;
}) => {
    const tokenCache = new Map<string, [number, NodeJS.Timeout]>();

    return {
        check: (res: any, limit: number, token: string) =>
            new Promise<void>((resolve, reject) => {
                if (!tokenCache.has(token)) {
                    tokenCache.set(token, [0, setTimeout(() => tokenCache.delete(token), interval)]);
                }

                const tokenData = tokenCache.get(token)!;
                tokenData[0] += 1;

                const currentUsage = tokenData[0];
                const isRateLimited = currentUsage >= limit;

                res.setHeader('X-RateLimit-Limit', limit);
                res.setHeader('X-RateLimit-Remaining', isRateLimited ? 0 : limit - currentUsage);

                if (isRateLimited) {
                    reject();
                } else {
                    resolve();
                }
            }),
    };
};
