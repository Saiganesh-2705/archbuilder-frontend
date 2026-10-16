import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ContactModalContext = createContext(null);

export const ContactModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactModal = useCallback(() => setIsOpen(true), []);
  const closeContactModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openContactModal, closeContactModal }),
    [isOpen, openContactModal, closeContactModal]
  );

  return <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>;
};

// Any component can call openContactModal() to pop the form open, from
// anywhere in the tree — no prop drilling needed.
export const useContactModal = () => {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used inside a ContactModalProvider");
  return ctx;
};
