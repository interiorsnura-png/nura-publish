import { guaranteeEnabled } from "../../lib/guarantee-preview.mjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import '../../public/nura-guarantee.css';
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "10-Year Cabinetry Guarantee | NURA Interiors" },
  description: "A 10-year guarantee on NURA-made cabinetry, included in your written contract. Explore the coverage and contact our studio for aftercare support.",
  alternates: {
    canonical: "/guarantee",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function GuaranteePage() {
  if (!guaranteeEnabled()) {
    notFound();
  }

  return (
    <main id="main" className="ng-page">
      <section className="ng-hero">
        <div className="ng-hero-copy">
        <p className="ng-brand-mark">NURA / Quality & aftercare</p>
        <h1>10-Year Cabinetry Guarantee</h1>
        <p className="ng-intro">
          Our cabinetry is backed by a 10-year guarantee, included in your written project contract. Lasting craftsmanship, with a clear commitment you can keep.
        </p>
        <div className="ng-hero-actions"><a className="primary" href="#guarantee-coverage">Explore your cover <span aria-hidden="true">↗</span></a><a className="secondary" href="#guarantee-support">Already a NURA client?</a></div>
        </div>
        <div className="ng-hero-photo"><img src="/assets/selected/nura-hero-shot.jpeg" alt="Bespoke NURA kitchen cabinetry and island" width="900" height="1000"/><div className="ng-seal"><span>10</span><small>YEAR<br/>CABINETRY GUARANTEE</small></div></div>
      </section>
      <div className="ng-facts" aria-label="Our guarantee at a glance"><div><strong>10 years</strong><span>Cover for NURA-made cabinetry</span></div><div><strong>In your contract</strong><span>A commitment backed in writing</span></div><div><strong>Direct support</strong><span>Speak with the NURA studio</span></div></div>
      <section id="guarantee-coverage" aria-labelledby="coverage-heading" className="ng-coverage"><p className="section-mark">01 / YOUR COVER</p><h2 id="coverage-heading">Beautifully made.<br/><em>Clearly protected.</em></h2></section>
      <section className="ng-grid" aria-label="Guarantee coverage and terms">
        <div className="ng-card">
          <h2>What is covered</h2>
          <p>
            Manufacturing and material defects in cabinet bodies, doors, and
            bespoke joinery that are expressly included in your agreed
            specification. Defects are assessed and, where confirmed, repaired
            or replaced in accordance with the contract.
          </p>
        </div>

        <div className="ng-card">
          <h2>Our written commitment</h2>
          <p>
            Ten years of cover for the NURA-made cabinetry specified in your contract. The items covered, the start date, and our remedy
            responsibilities are set out in writing inside your project contract
            before you sign.
          </p>
        </div>

        <div className="ng-card">
          <h2>Normal wear and exclusions</h2>
          <p>
            Normal wear, misuse, and accidental damage are distinguished from
            manufacturing defects. Applicable care instructions and exclusions
            are set out in your contract.
          </p>
        </div>

        <div className="ng-card">
          <h2>Hardware, worktops and appliances</h2>
          <p>
            Hardware, worktops, and appliances are supplied by specialist
            manufacturers and distributors. Their warranties are governed by the
            relevant manufacturer or supplier terms, and we do not extend our
            ten-year cabinetry guarantee to those items unless stated in your
            contract.
          </p>
        </div>

        <div className="ng-card">
          <h2>Installation labour and site terms</h2>
          <p>
            Coverage and responsibilities for installation labour, removal,
            refitting, and transport are explicitly recorded in your written
            project terms. Your contract explains what is included and any costs you would be responsible for, so you know where you stand before you agree.
          </p>
        </div>

        <div className="ng-card">
          <h2>London and Dubai service</h2>
          <p>
            The same ten-year cabinetry guarantee applies to NURA projects in
            London and Dubai. Local service and shipping arrangements are
            recorded in your contract.
          </p>
        </div>
      </section>

      <section id="guarantee-support" className="ng-next ng-support">
        <p className="section-mark">02 / HERE TO HELP</p>
        <h2>How to request support</h2>
        <p>Already a NURA client? Speak directly with our studio about your cabinetry. We will help you understand your cover and the next step.</p>
        <ol>
          <li>
            Provide your project reference, clear photographs, and a concise
            description of the concern.
          </li>
          <li>
            Our studio will assess the report against your contract terms and
            the agreed specification.
          </li>
          <li>
            We will explain our findings, the applicable remedy, and the next
            steps before any further work begins.
          </li>
        </ol>

        <div className="ng-contact">
          <p>
            Email{" "}
            <a href="mailto:studio@nura-interiors.com?subject=NURA%20guarantee%20support">
              studio@nura-interiors.com
            </a>
          </p>
          <p>
            Call our London studio:{" "}
            <a href="tel:+442071236949">+44 20 7123 6949</a>
          </p>
        </div>
      </section>

      <footer className="ng-footer">
        <p>
          <a href="/consultation">Book a project consultation</a>
        </p>
        <p>
          <a href="/">Return to NURA Interiors</a>
        </p>
      </footer>
    </main>
  );
}
