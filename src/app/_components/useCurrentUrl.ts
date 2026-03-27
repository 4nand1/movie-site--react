"use client";

import { useMemo, useSyncExternalStore } from "react";

type Listener = () => void;

const listeners = new Set<Listener>();
let historyPatched = false;

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const patchHistory = () => {
  if (historyPatched || typeof window === "undefined") return;

  historyPatched = true;

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function (...args) {
    originalPushState.apply(this, args);
    notifyListeners();
  };

  window.history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    notifyListeners();
  };

  window.addEventListener("popstate", notifyListeners);
};

const subscribe = (listener: Listener) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  patchHistory();
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => {
  if (typeof window === "undefined") return "";

  return `${window.location.pathname}${window.location.search}`;
};

export const useCurrentUrl = () => {
  const url = useSyncExternalStore(subscribe, getSnapshot, () => "");

  return useMemo(() => {
    const [pathname, search = ""] = url.split("?");

    return {
      pathname,
      search,
      searchParams: new URLSearchParams(search),
    };
  }, [url]);
};
