import { Hero } from "@/components/Hero";
import { PayoutRouter } from "@/components/PayoutRouter";
import { Mechanism } from "@/components/Mechanism";
import { NoBridge } from "@/components/NoBridge";
import { Terminal } from "@/components/Terminal";
import { Estimator } from "@/components/Estimator";
import { Fill } from "@/components/Fill";
import { Verify } from "@/components/Verify";
import { Questions } from "@/components/Questions";

export default function Home() {
  return (
    <>
      <Hero />
      <PayoutRouter />
      <Mechanism />
      <NoBridge />
      <Terminal />
      <Estimator />
      <Fill />
      <Verify />
      <Questions />
    </>
  );
}
