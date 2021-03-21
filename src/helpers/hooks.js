import React, { useEffect, useRef } from "react";

export const usePrevious = val => {
    const valRef = useRef(val);
    useEffect(() => {
        valRef.current = val;
    }, [val]);
    return valRef.current;
};
