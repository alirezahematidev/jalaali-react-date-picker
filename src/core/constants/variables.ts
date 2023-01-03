const isServer = typeof window === "undefined";

const isClient = typeof window !== "undefined";

const isDOM = typeof document !== "undefined";

export { isServer, isClient, isDOM };
