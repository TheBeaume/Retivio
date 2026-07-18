import React from "react";
import { supabase } from "../lib/supabase";
import {
  MessageSquare,
  Copy,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Search,
  Mail,
} from "lucide-react";

function PraviOutreach() {
  const [leads, setLeads] = React.useState([]);
  const [selectedLeadId, setSelectedLeadId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [replyType, setReplyType] = React.useState("");
  const [leadSearch, setLeadSearch] = React.useState("");
  const [customerReply, setCustomerReply] = React.useState("");
  const [instagramBulk, setInstagramBulk] = React.useState("");


  const loadLeads = async () => {
    const { data, error } = await supabase
      .from("pravi_leads")
      .select("*")
      .eq("archived", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Outreach lead load error:", error);
      setLeads([]);
      return;
    }

    setLeads(data || []);
  };

  React.useEffect(() => {
    loadLeads();
  }, []);

  const selectedLead = leads.find(
    (lead) => String(lead.id) === selectedLeadId
  );

  const normalizedSearch = leadSearch
    .toLowerCase()
    .replace(/\s/g, "");

  const filteredLeads = leads.filter((lead) => {
    const name = (lead.name || "")
      .toLowerCase()
      .replace(/\s/g, "");

    const phone = (lead.phone || "")
      .replace(/\D/g, "");

    const searchPhone = leadSearch.replace(/\D/g, "");

    const email = (lead.email || "").toLowerCase();

  
  const parseInstagramUsernames = () => {
    const usernames = Array.from(new Set(
      instagramBulk
        .split(/\r?\n|,|\s+/)
        .map(v=>v.trim())
        .filter(Boolean)
        .map(v=>v.replace(/^https?:\/\/(www\.)?instagram\.com\//i,""))
        .map(v=>v.replace(/^@/,""))
        .map(v=>v.replace(/\/$/,""))
    ));
    alert(`Found ${usernames.length} Instagram username(s).\n\n`+usernames.join("\n"));
  };

  return (
      name.includes(normalizedSearch) ||
      (searchPhone && phone.includes(searchPhone)) ||
      email.includes(leadSearch.toLowerCase().trim())
    );
  });

  const updateLeadProduct = async (product) => {
    if (!selectedLead) return;

    const { error } = await supabase
      .from("pravi_leads")
      .update({ product })
      .eq("id", selectedLead.id);

    if (error) {
      console.error("Product update error:", error);
      alert("Unable to update product.");
      return;
    }

    await loadLeads();

    window.dispatchEvent(
      new Event("pravi-leads-updated")
    );

    setMessage("");
    setReplyType("");
  };

  const generateFirstMessage = () => {
    if (!selectedLead) {
      alert("Please select a lead.");
      return;
    }

    const businessName =
      selectedLead.name || "your business";

    const product =
      selectedLead.product || "Unassigned";

    setReplyType("");

    if (product === "AURELIA") {
      setMessage(
`Hi ${businessName},

I came across your salon and wanted to connect.

We create modern luxury salon websites designed to improve your online presence and help customers explore your services more professionally.

I believe a premium website could add strong value to ${businessName}.

Would you like me to share a live salon website demo?

Regards,
Pravi Technology`
      );

      return;
    }

    if (product === "Retivio") {
      setMessage(
`Hi ${businessName},

I came across your salon and wanted to connect.

We're building Retivio, a salon growth and customer management platform designed to help salons manage customers, appointments and business growth from one place.

I'd love to share a quick overview with ${businessName}.

Would you like to see it?

Regards,
Pravi Technology`
      );

      return;
    }

    setMessage(
`Hi ${businessName},

I came across your business and wanted to connect.

We help businesses improve their digital presence and customer growth with modern websites and smart business tools.

Would you be open to a quick conversation?

Regards,
Pravi Technology`
    );
  };

  const generateReply = (type) => {
    if (!selectedLead) {
      alert("Please select a lead.");
      return;
    }

    const businessName = selectedLead.name || "your business";

    setReplyType(type);

    if (type === "positive") {
      setMessage(
`That's great, thank you for your interest.

I'd be happy to share more details about how we can help ${businessName} improve its digital presence and customer growth.

I can show you a quick demo and explain the options available.

Would you like me to share the demo here?`
      );
    }

    if (type === "maybe") {
      setMessage(
`Absolutely, no problem.

I understand you may want some time to consider it.

I can share a quick demo so you can explore it whenever convenient. There is no obligation.

Would you like me to send it here?`
      );
    }

    if (type === "negative") {
      setMessage(
`No problem at all. Thank you for your time and for getting back to me.

If ${businessName} ever needs help with its website, digital presence or customer growth in the future, we'd be happy to help.

Wishing you continued success.

Regards,
Pravi Technology`
      );
    }
  };

  const analyzeCustomerReply = () => {
    if (!selectedLead) {
      alert("Please select a lead.");
      return;
    }

    if (!customerReply.trim()) {
      alert("Please paste the customer reply.");
      return;
    }

    const reply = customerReply.toLowerCase();

    const negativeWords = [
      "not interested",
      "no thanks",
      "no thank you",
      "don't need",
      "do not need",
      "stop",
      "remove",
      "not required",
      "nahi chahiye",
      "interested nahi",
      "zarurat nahi"
    ];

    const maybeWords = [
      "later",
      "maybe",
      "think",
      "busy",
      "not now",
      "next month",
      "some time",
      "will see",
      "baad me",
      "soch",
      "abhi nahi",
      "busy hu"
    ];

    const positiveWords = [
      "yes",
      "interested",
      "sure",
      "send",
      "share",
      "demo",
      "details",
      "price",
      "pricing",
      "cost",
      "okay",
      "ok",
      "haan",
      "ha",
      "bhejo",
      "batao"
    ];

    if (negativeWords.some((word) => reply.includes(word))) {
      generateReply("negative");
      return;
    }

    if (maybeWords.some((word) => reply.includes(word))) {
      generateReply("maybe");
      return;
    }

    if (positiveWords.some((word) => reply.includes(word))) {
      generateReply("positive");
      return;
    }

    setReplyType("maybe");
    setMessage(
`Thank you for getting back to me.

I'd be happy to understand your requirements better and share the most relevant details.

Could you please tell me what you'd like to know more about?`
    );
  };

  const generateFollowUp = (type) => {
    if (!selectedLead) {
      alert("Please select a lead.");
      return;
    }

    const businessName =
      selectedLead.name || "your business";

    setReplyType("");

    if (type === "no-reply") {
      setMessage(
`Hi ${businessName},

Just following up on my previous message.

I wanted to check if you had a chance to review it. I'd be happy to share a quick demo if you're interested.

Regards,
Pravi Technology`
      );
      return;
    }

    if (type === "interested") {
      setMessage(
`Hi ${businessName},

Just following up regarding our previous conversation.

I'd be happy to help you with the next steps and answer any questions you may have.

Would you like to continue from here?

Regards,
Pravi Technology`
      );
      return;
    }

    if (type === "demo") {
      setMessage(
`Hi ${businessName},

I hope you had a chance to check the demo I shared.

I'd love to know your thoughts. If you have any questions or need any changes explained, I'm happy to help.

Regards,
Pravi Technology`
      );
    }
  };

  const copyMessage = async () => {
    if (!message) return;

    await navigator.clipboard.writeText(message);
    alert("Message copied.");
  };

  const openEmail = () => {
    if (!selectedLead?.email) {
      alert("This lead has no email address.");
      return;
    }

    if (!message.trim()) {
      alert("Create a message first.");
      return;
    }

    const subject = `Digital Growth Opportunity for ${selectedLead.name || "Your Business"}`;

    window.location.href =
      `mailto:${selectedLead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  const updateLeadStatus = async (status) => {
    if (!selectedLead) return;

    const { error } = await supabase
      .from("pravi_leads")
      .update({
        status,
        last_contacted_at: new Date().toISOString(),
      })
      .eq("id", selectedLead.id);

    if (error) {
      console.error("Lead status update failed:", error);
      return;
    }

    await loadLeads();

    window.dispatchEvent(
      new Event("pravi-leads-updated")
    );
  };

  const openWhatsApp = () => {
    if (!selectedLead?.phone) {
      alert("This lead has no phone number.");
      return;
    }

    if (!message.trim()) {
      alert("Create a message first.");
      return;
    }

    const phone = selectedLead.phone.replace(/\D/g, "");

    if (replyType === "positive") {
      updateLeadStatus("Interested");
    } else {
      const currentStatus = selectedLead.status || "New";

      if (currentStatus === "New") {
        updateLeadStatus("Contacted");
      }
    }

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div>
      <p className="text-sm text-purple-400">
        PRAVI OUTREACH
      </p>

      <h2 className="text-3xl md:text-4xl font-bold mt-2">
        Outreach Center
      </h2>

      <p className="text-gray-400 mt-2">
        Create outreach messages and respond based on lead interest.
      </p>

      <div className="mt-6 bg-gray-900 border border-white/10 rounded-2xl p-5">
        <h3 className="text-lg font-bold">Instagram Bulk Import (Preview)</h3>
        <textarea
          value={instagramBulk}
          onChange={(e)=>setInstagramBulk(e.target.value)}
          placeholder="@abc_salon\nhttps://instagram.com/xyz\nbeautyhub"
          className="mt-4 w-full h-32 rounded-xl bg-gray-950 border border-white/10 p-3 text-white"
        />
        <button
          type="button"
          onClick={parseInstagramUsernames}
          className="mt-4 rounded-xl bg-purple-600 px-5 py-3 font-bold text-white">
          Parse Usernames
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-8">
        <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
          <h3 className="text-xl font-bold">
            Select Lead
          </h3>

          <div className="flex items-center gap-2 bg-gray-950 border border-white/10 rounded-xl px-4 mt-5 focus-within:border-purple-500 transition">
            <Search size={18} className="text-gray-500 shrink-0" />

            <input
              type="text"
              value={leadSearch}
              onChange={(e) => setLeadSearch(e.target.value)}
              placeholder="Search business name, mobile or email"
              className="w-full bg-transparent text-white placeholder:text-gray-500 py-3 outline-none"
            />
          </div>

          <select
            value={selectedLeadId}
            onChange={(e) => {
              setSelectedLeadId(e.target.value);
              setMessage("");
              setReplyType("");
            }}
            className="w-full bg-gray-950 border border-white/10 text-white rounded-xl px-4 py-3 mt-5 outline-none focus:border-purple-500"
          >
            <option value="">Choose saved lead</option>

            {filteredLeads.map((lead) => (
              <option key={lead.id} value={String(lead.id)}>
                {lead.name}
                {lead.phone ? " · Phone available" : " · No phone"}
              </option>
            ))}
          </select>

          {selectedLead && (
            <div className="bg-gray-950 border border-white/10 rounded-xl p-4 mt-4">
              <h4 className="font-bold">
                {selectedLead.name}
              </h4>

              <p className="text-sm text-gray-400 mt-1">
                {selectedLead.category || "Business"}
              </p>

              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">
                  Outreach Product
                </p>

                <select
                  value={selectedLead.product || "Unassigned"}
                  onChange={(e) =>
                    updateLeadProduct(e.target.value)
                  }
                  className="w-full bg-gray-900 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                >
                  <option value="Unassigned">
                    Unassigned
                  </option>
                  <option value="AURELIA">
                    AURELIA
                  </option>
                  <option value="Retivio">
                    Retivio
                  </option>
                </select>
              </div>

              <p className="text-sm text-gray-300 mt-3">
                {selectedLead.phone || "Phone number unavailable"}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                {selectedLead.email || "Email unavailable"}
              </p>
            </div>
          )}

          <button
            onClick={generateFirstMessage}
            disabled={!selectedLead}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl px-5 py-3 font-semibold transition flex items-center justify-center gap-2"
          >
            <MessageSquare size={18} />
            Generate First Message
          </button>

          <div className="border-t border-white/10 mt-6 pt-5">
            <h3 className="font-bold">
              Follow-up Message
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Prepare a quick follow-up based on the current situation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              <button
                onClick={() => generateFollowUp("no-reply")}
                disabled={!selectedLead}
                className="bg-gray-950 border border-white/10 text-gray-300 rounded-xl px-3 py-3 text-sm"
              >
                No Reply
              </button>

              <button
                onClick={() => generateFollowUp("interested")}
                disabled={!selectedLead}
                className="bg-gray-950 border border-white/10 text-gray-300 rounded-xl px-3 py-3 text-sm"
              >
                Interested
              </button>

              <button
                onClick={() => generateFollowUp("demo")}
                disabled={!selectedLead}
                className="bg-gray-950 border border-white/10 text-gray-300 rounded-xl px-3 py-3 text-sm"
              >
                Demo Sent
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 mt-6 pt-5">
            <h3 className="font-bold">
              Customer Replied?
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Select the reply sentiment to prepare your response.
            </p>

            <textarea
              value={customerReply}
              onChange={(e) => setCustomerReply(e.target.value)}
              placeholder="Paste customer's exact WhatsApp reply here..."
              className="w-full h-28 bg-gray-950 border border-white/10 text-white placeholder:text-gray-500 rounded-xl p-4 mt-4 outline-none focus:border-purple-500 resize-none"
            />

            <button
              onClick={analyzeCustomerReply}
              disabled={!selectedLead || !customerReply.trim()}
              className="w-full mt-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl px-5 py-3 font-semibold transition"
            >
              Analyze Reply & Prepare Response
            </button>

            {replyType && (
              <p className="text-sm text-gray-400 mt-3">
                Detected response:{" "}
                <span className="text-purple-400 font-semibold capitalize">
                  {replyType}
                </span>
              </p>
            )}

            <div className="grid grid-cols-3 gap-2 mt-4">
              <button
                onClick={() => generateReply("positive")}
                disabled={!selectedLead}
                className={`border rounded-xl px-3 py-3 text-sm flex flex-col items-center gap-2 ${
                  replyType === "positive"
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-gray-950 border-white/10 text-gray-300"
                }`}
              >
                <ThumbsUp size={18} />
                Positive
              </button>

              <button
                onClick={() => generateReply("maybe")}
                disabled={!selectedLead}
                className={`border rounded-xl px-3 py-3 text-sm flex flex-col items-center gap-2 ${
                  replyType === "maybe"
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-gray-950 border-white/10 text-gray-300"
                }`}
              >
                <HelpCircle size={18} />
                Maybe
              </button>

              <button
                onClick={() => generateReply("negative")}
                disabled={!selectedLead}
                className={`border rounded-xl px-3 py-3 text-sm flex flex-col items-center gap-2 ${
                  replyType === "negative"
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-gray-950 border-white/10 text-gray-300"
                }`}
              >
                <ThumbsDown size={18} />
                Negative
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
          <h3 className="text-xl font-bold">
            Suggested Message
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Review and edit before sending.
          </p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your outreach or reply message will appear here..."
            className="w-full h-80 bg-gray-950 border border-white/10 text-white placeholder:text-gray-500 rounded-xl p-4 mt-5 outline-none focus:border-purple-500 resize-none"
          />

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={copyMessage}
              disabled={!message}
              className="bg-gray-950 border border-white/10 disabled:opacity-40 text-gray-300 px-5 py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Copy size={18} />
              Copy
            </button>

            <button
              onClick={openEmail}
              disabled={!message || !selectedLead?.email}
              className="bg-gray-950 border border-white/10 disabled:opacity-40 text-gray-300 px-5 py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Mail size={18} />
              Email
            </button>

            <button
              onClick={openWhatsApp}
              disabled={!message || !selectedLead?.phone}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white px-5 py-3 rounded-xl font-semibold flex-1 flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              Open in WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PraviOutreach;
