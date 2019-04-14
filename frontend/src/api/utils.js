export const getDay = (start) => {
    let currTime = new Date();
    let diffTime = currTime.getTime() - new Date(start).getTime();
    return (diffTime / (24 * 3600 * 1000) | 0) + ' Days';
};
