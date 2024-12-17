export function debounce<T extends unknown[]>(func: (...args: T) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<typeof func>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}