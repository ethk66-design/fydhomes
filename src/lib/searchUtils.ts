export function parsePrice(priceStr: string | null | undefined): number | null {
    if (!priceStr) return null;
    const lower = priceStr.toLowerCase();

    // Extract the first contiguous number (including decimals)
    const match = lower.match(/([0-9]*\.?[0-9]+)/);
    if (!match) return null;
    const num = parseFloat(match[1]);

    if (lower.includes('cr') || lower.includes('crore') || lower.includes('crores')) {
        return num * 10000000;
    }
    if (lower.includes('lak') || lower.includes('lac')) { // matches lakh, lakhs, lac, lacs
        return num * 100000;
    }

    // If it's a raw number or rent (e.g. "25000", "Price on Request" handled by !match)
    return num;
}

export function parseArea(areaStr: string | null | undefined): number | null {
    if (!areaStr) return null;
    const lower = areaStr.toLowerCase();

    // Extract number
    const match = lower.match(/([0-9]*\.?[0-9]+)/);
    if (!match) return null;
    let num = parseFloat(match[1]);

    // Standardize everything to Square Feet for apples-to-apples comparison
    // 1 Cent = 435.6 SqFt
    if (lower.includes('cent')) {
        num = num * 435.6;
    }

    // If it's already SQFT, we leave it as is.
    return num;
}
