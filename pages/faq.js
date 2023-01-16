import React from "react";
import Header from "../components/Header";
import { openDB } from "../src/openDB";

function faq({ faq }) {
  return (
    <div>
      {/* <Header /> */}
      {faq.map((f) => (
        <div key={f.id}>
          <h1 className="font-bold">{f.question}</h1>
          <h2>{f.answer}</h2>
        </div>
      ))}
    </div>
  );
}

export default faq;

export const getStaticProps = async () => {
  const db = await openDB();
  const faq = await db.all("SELECT * FROM FAQ ORDER BY createDate DESC");
  return { props: { faq } };
};
