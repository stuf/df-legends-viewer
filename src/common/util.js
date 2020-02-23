export const formatPlural = (s, p, v) => (v === 1 ? `1 ${s}` : `${v} ${p}`);

export const asNum = n => (!isNaN(n) ? parseInt(n, 10) : undefined);
