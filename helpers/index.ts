// export const getRuPrice = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');

export const getRuPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(price);
};