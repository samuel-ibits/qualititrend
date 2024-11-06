import OfferLetter from "@/components/lease&sale/OfferLetter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lease and Sales | Offer Letter",
};

export default function OfferLetterPage() {
  return (
    <OfferLetter />
  )
}
