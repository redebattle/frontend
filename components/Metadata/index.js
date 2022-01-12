export default function MetadataComponent({title, description, imgURL}) {
  return (
    <>
      {/* fb & Whatsapp */}
      {/* Site Name, Title, and Description to be displayed */}
      <meta property="og:site_name" content="Rede Battle" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Image to display */}
      {/* Replace   «example.com/image01.jpg» with your own */}
      <meta property="og:image" content={imgURL} />

      {/* No need to change anything here */}
      <meta property="og:type" content="website" />
      <meta property="og:image:type" content="image/jpeg" />

      {/* Size of image. Any size up to 300. Anything above 300px will not work in WhatsApp */}
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />

      {/* Website to visit when clicked in fb or WhatsApp */}
      <meta property="og:url" content="https://www.redebattle.com.br" />
    </>
  )
}
