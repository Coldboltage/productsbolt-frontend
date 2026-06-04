import SupportInput from "@/components/SupportInput";
import SupportTextarea from "@/components/SupportTextarea";
import { supportInputs } from "@/constants/support.constant";
import { useFormStatus } from "@/hooks/status.hook";
import { Status } from "@/types/support.types";
import { useEffect, useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { status, setStatus, resetStatus } = useFormStatus();

  useEffect(() => {
    if (status === Status.SUCCESS) {
      console.log("about to fire");
      const timer = setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        resetStatus();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const submitForm = () => {
    console.log("Hello");
    if (name && email && phone && subject && message) {
      setStatus(Status.SUCCESS);
    } else {
      setStatus(Status.ERROR);
    }
  };

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
                type={"text"}
                onChange={setName}
              />
              <SupportInput
                text={supportInputs[1].text}
                value={email}
                type={"email"}
                onChange={setEmail}
              />
              <SupportInput
                text={supportInputs[2].text}
                value={phone}
                type={"tel"}
                onChange={setPhone}
              />
              <SupportInput
                text={supportInputs[3].text}
                value={subject}
                type={"text"}
                onChange={setSubject}
              />
            </div>
            <div className="mb-10">
              <SupportTextarea
                text="Message"
                value={message}
                onChange={setMessage}
              />
            </div>
            <button
              onClick={() => submitForm()}
              className="w-full flex justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </section>
          <section>
            {status === Status.SUCCESS && (
              <div className="mt-4 text-green-500">Support message sent.</div>
            )}

            {status === Status.ERROR && (
              <div className="mt-4 text-red-500">Error found in the form</div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
