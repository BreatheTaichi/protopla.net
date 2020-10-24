import { useEffect } from "react";

function useWindowListener(eventName, listener) {
    useEffect(() => {
        window.addEventListener(eventName, listener);
        return () => {
            window.removeEventListener(eventName, listener);
        };
    }, [eventName, listener]);
}

export default useWindowListener;
