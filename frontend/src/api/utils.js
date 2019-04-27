export const getDay = (start, end) => {
    let diffTime = end.getTime() - start.getTime();
    return (diffTime / (24 * 3600 * 1000) | 0);
};
