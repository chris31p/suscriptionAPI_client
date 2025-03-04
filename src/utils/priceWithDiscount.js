const priceWithDiscount = (price, dis = 1) => {
    const discountAmount = Math.round((Number(price) * Number(dis)) / 100);
    const actualPrice = Math.round(Number(price) - discountAmount);
    return actualPrice;
};

export default priceWithDiscount;
