export const minZeroAutoScalingProvider = (original) => {
    const res = original();
    // if (res !== null) {
    //     if (res.priceRange.minValue < 0) {
    //         res.priceRange.minValue = 0;
    //     }

    // }
    // return res;
    return {
        ...res,
        priceRange: {
            minValue: Math.max(res.priceRange.minValue, 0),
            maxValue: res.priceRange.maxValue,
        },

    }
}