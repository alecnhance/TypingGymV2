/**
 * Interpolates between two hex colors based on a factor (0-1)
 * @param {string} color1 - First hex color (e.g., '#161616')
 * @param {string} color2 - Second hex color (e.g., '#F5972F')
 * @param {number} factor - Interpolation factor between 0 and 1
 * @returns {string} - Interpolated hex color
 */
export const interpolateColor = (color1, color2, factor) => {
    const hex = (color) => color.replace('#', '');
    
    const r1 = parseInt(hex(color1).substring(0, 2), 16);
    const g1 = parseInt(hex(color1).substring(2, 4), 16);
    const b1 = parseInt(hex(color1).substring(4, 6), 16);

    const r2 = parseInt(hex(color2).substring(0, 2), 16);
    const g2 = parseInt(hex(color2).substring(2, 4), 16);
    const b2 = parseInt(hex(color2).substring(4, 6), 16);

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

