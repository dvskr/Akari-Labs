import Script from "next/script";
import { MARKUP } from "./akari-markup";

// The home page: static markup rendered on the server, brought to life by one script after hydration
// (the ring of islands, the rope control, the boards trail, the chat demo, the phones and the form).
export default function Home() {
  return (
    <>
      <div className="ak-root" dangerouslySetInnerHTML={{ __html: MARKUP }} />
      <Script src="/akari/site.js" strategy="afterInteractive" />
    </>
  );
}
