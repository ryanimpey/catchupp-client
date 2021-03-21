export default {
    colour: {
        primary: "#0A3058",
        secondary: "#00FBC5",

        white: "#ffffff",
        whiteGray: "#f5f5f5",
        lighterGray: "#E8E8E8",
        lightGray: "#C7C7C7",
        gray: "#B9B9B9",
        darkGray: "#797979",
        black: "#252525",

        warning: "#F0933A",
        success: "#00A813",
        error: "#F01F0E",
        info: "#21A0CC",
    },
    borderRadius: {
        base: 5,
    },
    font: {
        size: { base: 16 },
        family: { primary: `"Arial", sans-serif` },
    },
    transition: {
        base: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        accelerate: "cubic-bezier(0.4, 0.0, 1, 1)",
        decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",
    },
    spacing: {
        base: 1 * 1.875 * 16,
        double: 1 * 1.875 * 2 * 16,
        half: ((1 * 1.875) / 2) * 16,
        quarter: ((1 * 1.875) / 4) * 16,
        threeQuarters: ((1 * 1.875) / 4) * 3 * 16,
    },
};
