import { useEffect } from "react";

export default function GoogleAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
        data-ad-slot="1900828931"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  )
}
