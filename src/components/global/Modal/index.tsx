"use client";

import { ReactNode, useEffect } from "react";
import ReactModal from "react-modal";
import { motion } from "framer-motion";
import ProgressBar from "../ProgressBar";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";
import Icons from "@/components/icons";

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--open-sans",
});

type ModalProps = {
  children?: ReactNode;
  allowClose?: boolean;
  shouldCloseOnOverlayClick?: boolean;
  onRequestClose?: () => void;
  show: boolean;
  title?: string;
  padding?: boolean;
  width?: string;
  loading?: boolean;
  closeButtonStyle?: string;
  showHeaderBorder?: boolean;
  is_message?: boolean;
};

export default function Modal(props: ModalProps) {
  const {
    children,
    show = false,
    shouldCloseOnOverlayClick = true,
    allowClose = true,
    onRequestClose = () => {},
    title,
    padding = true,
    width = "",
    loading = false,
    is_message,
    closeButtonStyle,
    showHeaderBorder = true,
  } = props;

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);

  return (
    <ReactModal
      isOpen={show}
      shouldCloseOnOverlayClick={allowClose && shouldCloseOnOverlayClick}
      onRequestClose={onRequestClose}
      className={cn(
        "flex h-screen w-full relative lg:w-auto font-OpenSans",
        openSans.variable,
      )}
      overlayClassName="overlay"
      ariaHideApp={false}
      closeTimeoutMS={200}
    >
      <motion.section
        layout
        transition={{ duration: 0.3 }}
        className="lg:container lg:px-0"
      >
        <section
          className={cn(
            "bg-white relative lg:rounded-md overflow-hidden lg:max-h-[85vh] w-screen lg:w-[867px] max-w-100vw",
            width,
            is_message ? "m-auto" : "max-lg:h-screen",
          )}
        >
          {loading && (
            <div className="absolute overflow-hidden left-0 right-0 top-0">
              <ProgressBar value={0.7} indeterminate={true} />
            </div>
          )}
          <div
            className={cn("px-5 py-4 lg:p-6", {
              "border-b border-[#5A5A5A80]": showHeaderBorder,
            })}
          >
            <div className="flex justify-between items-center">
              <div>
                {title && (
                  <h2 className="font-medium text-sm sm:text-base">{title}</h2>
                )}
              </div>
              <div>
                {allowClose && (
                  <button
                    className="flex justify-center items-center"
                    aria-label="close"
                    onClick={onRequestClose}
                  >
                    <Icons.CloseIcon
                      className={cn("fill-black-500", closeButtonStyle)}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
          <section
            className={cn(
              { "px-6 py-6": padding },
              "max-h-[calc(100vh-57px)] max-lg:h-full lg:max-h-[calc(85vh-120px)] overflow-x-hidden overflow-y-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary scrollbar-track-pc-02 scrollbar-track-rounded-md scrollbar-thumb-rounded-md",
            )}
          >
            {children}
          </section>
        </section>
      </motion.section>
    </ReactModal>
  );
}
