export enum Timeframe {
    FiveMinutes = '5m',
    FifteenMinutes = '15m',
    ThirtyMinutes = '30m',
    Hourly = '1h',
    TwoHours = '2h',
    FourHours = '4h',
    SixHours = '6h',
    TwelveHours = '12h',
    Daily = '1d'
}

export const Endpoints = {
   Binance: {
        fundingRates: (symbol : string) : string => {
            return `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}`;
        },
        openInterest: (symbol : string, period : Timeframe) : string => {
            return `https://fapi.binance.com/futures/data/openInterestHist=${symbol}&period=${period}`;
        },
        longShortRatio: (symbol : string, period : Timeframe) : string => {
            return `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=${period}`;
        },
        priceHistory: (symbol: string, period : Timeframe, limit : number) : string => {
            return `https://fapi.binance.com/fapi/v1/markPriceKlines?symbol=${symbol}&interval=${period}&limit=${limit}`;
        },
        marketPrice: (symbol: string) : string => {
            return `https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${symbol}`;
        }
   }
}