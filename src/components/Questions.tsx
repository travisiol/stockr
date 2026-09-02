import { Section, SectionHead } from "./ui/Section";
import { siteConfig } from "@/lib/site-config";

/**
 * Native <details>, so the FAQ opens with JavaScript disabled and is
 * announced correctly without any ARIA of ours.
 *
 * The answers are written to be usable against the project, not only for it.
 * A FAQ that only answers the flattering questions is marketing with a
 * question mark bolted on.
 */
const questions: { q: string; a: React.ReactNode }[] = [
  {
    q: "What do I actually receive?",
    a: (
      <>
        Tokens of the asset you picked, in your own wallet. Not a voucher, not
        a claim on this project, not a balance in an app it controls — the
        payout is a transfer of a tokenized equity to your address.
      </>
    ),
  },
  {
    q: "Where does the money come from?",
    a: (
      <>
        Fees on {siteConfig.ticker} trades, and nothing else. There is no
        lending, no yield source, no outside revenue and no treasury magic. If
        nobody trades the token, there is no fee, and holders receive nothing.
        That is not a failure mode — it is the mechanism working as described.
      </>
    ),
  },
  {
    q: "Do I have to stake, lock or claim?",
    a: (
      <>
        You hold the token; that is the whole requirement. Whether the credit
        is pushed to every wallet or claimed by each holder is still a
        contract decision — pushing costs gas that grows with the holder
        count, claiming leaves value unclaimed. It will be visible in the
        contract before launch.
      </>
    ),
  },
  {
    q: "Can I change my payout asset later?",
    a: (
      <>
        Yes. It is a per-wallet setting, not a lock-in, and it applies from the
        next distribution onwards — it cannot retroactively change one that
        has already been paid. Right now the selector remembers your choice in
        this browser only, because there is no contract to write it to.
      </>
    ),
  },
  {
    q: "What if I never pick one?",
    a: (
      <>
        The contract has to define a fallback, and this site pre-selects the
        index as the obvious candidate — but that default is not settled, and
        showing it selected is not a promise that it is what ships.
      </>
    ),
  },
  {
    q: "Is a tokenized share the same as a share?",
    a: (
      <>
        No. It is a claim issued by a third party against shares they hold.
        Voting rights, dividend treatment, redemption terms and what happens
        if the issuer fails are all set by that issuer, not by this project,
        and you should read their terms rather than ours.
      </>
    ),
  },
  {
    q: "The token trades 24/7. The stock market does not.",
    a: (
      <>
        Correct, and it is the sharpest edge in this design. Fees accrue at
        every hour; the market the payout asset tracks keeps its own hours.
        How the issuer prices its token overnight and at weekends is the
        issuer&rsquo;s behaviour, and it belongs in your risk assessment.
      </>
    ),
  },
  {
    q: "Why does removing the bridge matter?",
    a: (
      <>
        Because a bridge is two more contracts your reward has to survive, and
        a queue it can sit in when they pause. A payout asset issued on the
        same chain means the router swaps and transfers, and there is nothing
        else in the path. It removes that risk and no other.
      </>
    ),
  },
  {
    q: "What can go wrong?",
    a: (
      <>
        No trading means no payout. The issuer of a tokenized equity can fail,
        halt redemptions, or change terms. The router is a contract and
        contracts have bugs. The token&rsquo;s own price can fall further than
        any payout compensates. And a token distributing securities exposure
        is treated differently in different jurisdictions.
      </>
    ),
  },
  {
    q: "Is any of this live?",
    a: (
      <>
        No. There is no token, no router, no fee and no distribution. Every
        address on this site is blank, every project figure is zero, and
        anything currently claiming to be {siteConfig.ticker} is not this.
      </>
    ),
  },
];

export function Questions() {
  return (
    <Section id="questions">
      <SectionHead index="08" title="Questions" />

      <div className="panel px-5 sm:px-6" data-reveal>
        {questions.map((item) => (
          <details key={item.q} className="qa border-b border-rule last:border-b-0">
            <summary className="text-[13px] font-medium uppercase tracking-[0.1em] text-fg">
              {item.q}
            </summary>
            <p className="prose-sans max-w-[76ch] pb-5 text-[13px] leading-relaxed text-fg-dim">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
