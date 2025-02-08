import { useState, useEffect } from "react";
import Cookie from "js-cookie";

function useCookie<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);

  // Use effect to ensure we only interact with cookies on the client side
  useEffect(() => {
    const sessionCookieValue = JSON.parse(Cookie.get("__session") ?? "{}");
    const cookieValue = sessionCookieValue[key] as T;
    if (cookieValue) {
      try {
        const parsedValue = cookieValue as T;
        setValue(parsedValue);
      } catch (error) {
        console.error("Error parsing cookie:", error);
      }
    } else {
      // Set the cookie with the initial value if it doesn't exist
      sessionCookieValue[key] = initialValue;
      Cookie.set("__session", JSON.stringify(sessionCookieValue), {
        sameSite: "Strict",
        secure: true,
        expires: 365,
      });
    }
  }, [key, initialValue]);

  // Update cookie and state when the value changes
  const setCookieValue = (newValue: T) => {
    setValue(newValue);
    const existingCookie = JSON.parse(Cookie.get("__session") ?? "{}");
    existingCookie[key] = newValue;
    Cookie.set("__session", JSON.stringify(existingCookie), {
      sameSite: "Strict",
      secure: true,
      expires: 365,
    });
  };

  return [value, setCookieValue];
}

export default useCookie;
