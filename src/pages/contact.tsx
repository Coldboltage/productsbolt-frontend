import SupportInput from "@/components/SupportInput";
import SupportTextarea from "@/components/SupportTextarea";
import { supportInputs } from "@/constants/support.constant";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen overflow-hidden text-slate-100">
      <div className=" mx-auto max-w-6xl pb-24">
        <main className="px-5 pt-10 md:px-8">
          <section className="mb-10">
            <h1 className="pb-4 text-3xl font-semibold text-white md:text-4xl">
              Contact Page
            </h1>
            <p className="mb-10 text-slate-300 md:text-lg">
              Fill out the contact form
            </p>
          </section>
          <section>
            <div className="grid grid-cols-2 gap-10 mb-10">
              <SupportInput
                text={supportInputs[0].text}
                value={name}
                onChange={setName}
              />
              <SupportInput
                text={supportInputs[1].text}
                value={email}
                onChange={setEmail}
              />
              <SupportInput
                text={supportInputs[2].text}
                value={phone}
                onChange={setPhone}
              />
              <SupportInput
                text={supportInputs[3].text}
                value={subject}
                onChange={setSubject}
              />
            </div>
            <div>
              <SupportTextarea
                text="Message"
                value={message}
                onChange={setMessage}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
