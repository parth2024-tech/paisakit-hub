"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Share2, PhoneCall } from "lucide-react";

interface Scam {
  id: string;
  name: string;
  severity: string;
  lossRisk: string;
  target: string;
  howItWorks: string;
  redFlags: string[];
  immediateAction: string;
}

interface Props {
  scams: Scam[];
}

const RED_FLAG_SYMPTOMS = [
  { id: "pin", label: "Someone asked for a UPI PIN, OTP, or asked you to scan a QR code to 'receive' money." },
  { id: "arrest", label: "A caller claiming to be Police, CBI, ED, or Customs ordered you to stay on video call for 'digital arrest'." },
  { id: "task", label: "You were offered ₹3,000–₹5,000/day for rating hotels, liking YouTube reels, or doing Telegram tasks." },
  { id: "deposit", label: "They asked you to pay a 'security deposit', 'recharge', or 'processing tax' before you can withdraw profits." },
  { id: "contacts", label: "An instant loan app demanded permission to read your private contact list and photo gallery." },
  { id: "signal", label: "Your mobile cellular network abruptly died or showed 'No Service' without any tower outage." },
  { id: "guarantee", label: "A WhatsApp/Telegram trading group promised guaranteed 20%+ monthly return with zero loss risk." },
];

export function ScamCheckerClient({ scams }: Props) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"library" | "checker">("checker");

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isHighRisk = selectedSymptoms.length > 0;

  const handleShareScam = (scam: Scam) => {
    const text = encodeURIComponent(
      `⚠️ *URGENT SCAM ALERT: ${scam.name}*\n\n` +
      `🚨 *How it works:* ${scam.howItWorks.slice(0, 150)}...\n\n` +
      `🚩 *Key Red Flag:* ${scam.redFlags[0]}\n\n` +
      `🛡️ *Immediate Action:* Call National Cyber Helpline 1930 immediately.\n\n` +
      `Read full defense guide on PaisaKit: https://paisakit.vercel.app/scams#${scam.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-10">
      {/* Helpline Alert Banner */}
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-600 text-surface flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-950 uppercase tracking-wide">
              Victim of a Cyber Fraud within the Last 24 Hours?
            </h3>
            <p className="text-xs text-red-800 mt-0.5">
              Call the Government National Cyber Crime Helpline at <strong className="text-red-950 font-mono text-sm font-extrabold underline">1930</strong> immediately to freeze scammer accounts, or log a complaint at <span className="font-semibold">cybercrime.gov.in</span>.
            </p>
          </div>
        </div>

        <a
          href="tel:1930"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-red-600 text-surface text-xs font-bold hover:bg-red-700 transition-colors shrink-0 shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5" /> Dial 1930
        </a>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-ink-200">
        <button
          type="button"
          onClick={() => setActiveTab("checker")}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "checker"
              ? "border-brand text-brand-dark"
              : "border-transparent text-ink-500 hover:text-ink-800"
          }`}
        >
          Interactive Scam Detector
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("library")}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "library"
              ? "border-brand text-brand-dark"
              : "border-transparent text-ink-500 hover:text-ink-800"
          }`}
        >
          Common Indian Traps Library ({scams.length})
        </button>
      </div>

      {/* Interactive Symptom Checker Tab */}
      {activeTab === "checker" && (
        <div className="bg-surface border border-ink-200 rounded-lg p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold text-brand uppercase tracking-wider">
              Self-Check Assessment
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight mt-1">
              Did someone contact you with any of these demands?
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 mt-1">
              Select all options that match your recent experience to verify if you are dealing with a financial trap.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {RED_FLAG_SYMPTOMS.map((symptom) => {
              const isChecked = selectedSymptoms.includes(symptom.id);
              return (
                <button
                  key={symptom.id}
                  type="button"
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                    isChecked
                      ? "bg-red-50/70 border-red-400 text-red-950 ring-1 ring-red-400"
                      : "bg-surface border-ink-200 text-ink-800 hover:bg-ink-50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isChecked ? "bg-red-600 border-red-600 text-surface" : "border-ink-400"
                  }`}>
                    {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                  </div>
                  <span className="font-medium leading-relaxed">{symptom.label}</span>
                </button>
              );
            })}
          </div>

          {/* Assessment Verdict Card */}
          <div className="pt-4 border-t border-ink-200">
            {isHighRisk ? (
              <div className="bg-red-50 border border-red-300 rounded-lg p-5 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="text-base font-extrabold text-red-900">
                    99.9% PROBABILITY OF ACTIVE FRAUD
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
                  Legitimate banks, Indian police forces, and authentic employers NEVER request any of the actions you selected. You are dealing with organized cyber extortion syndicates.
                </p>
                <div className="bg-surface border border-red-200 rounded p-3 text-xs text-ink-800 space-y-1">
                  <p className="font-bold text-ink-900">Immediate Action Plan:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-ink-700">
                    <li>Cut all communication and block the caller/sender immediately.</li>
                    <li>Do NOT transfer any money or pay &quot;clearance fees&quot;.</li>
                    <li>If money was sent, call <strong>1930</strong> within 2 hours with transaction UTR numbers.</li>
                    <li>Save all chat logs and call recordings as legal evidence.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-brand-subtle border border-brand-border rounded-lg p-5 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand shrink-0" />
                <p className="text-xs sm:text-sm text-brand-dark">
                  No red-flag symptoms selected. If in doubt, remember the primary rule: <strong>Never enter a PIN to receive money, and legitimate law enforcement never holds virtual trials on Skype.</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Red-Flag Library Tab */}
      {activeTab === "library" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scams.map((scam) => (
              <article
                key={scam.id}
                id={scam.id}
                className="bg-surface border border-ink-200 rounded-lg p-6 flex flex-col justify-between hover:border-ink-400 transition-all scroll-mt-24 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-red-100 text-red-800 border border-red-200">
                      Severity: {scam.severity}
                    </span>
                    <span className="text-xs text-ink-500 font-mono font-semibold">
                      Typical Loss: {scam.lossRisk}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-ink-900 mb-2 leading-snug">
                    {scam.name}
                  </h3>

                  <p className="text-xs text-ink-600 mb-4 leading-relaxed">
                    {scam.howItWorks}
                  </p>

                  {/* Red flags */}
                  <div className="bg-canvas border border-ink-200 rounded p-3 mb-4">
                    <p className="text-[11px] font-bold text-red-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Dead Giveaways
                    </p>
                    <ul className="space-y-1 text-xs text-ink-700">
                      {scam.redFlags.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-ink-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-ink-500">
                    Target: <span className="text-ink-700 font-medium">{scam.target}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleShareScam(scam)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand text-surface text-xs font-semibold hover:bg-brand-dark transition-colors shadow-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share Warning
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScamCheckerClient;
