export default function MetadataComponent({title, description, imgURL, url}) {
  return (
    <>
      {/* fb & Whatsapp */}
      {/* Site Name, Title, and Description to be displayed */}
      <meta property="og:site_name" content="Rede Battle" />
      <meta property="og:title" content={title ? title : 'Rede Battle'} />
      <meta property="og:description" content={description ? description : 'Conheça o site da Rede Battle! Acesse já www.redebattle.com.br'} />

      {/* Image to display */}
      {/* Replace   «example.com/image01.jpg» with your own */}
      <meta property="og:image" content={imgURL ? imgURL : 'https://redebattle.com.br/img/bg-minecraft.jpg'} />

      {/* No need to change anything here */}
      <meta property="og:type" content="website" />
      <meta property="og:image:type" content="image/jpeg" />

      {/* Size of image. Any size up to 300. Anything above 300px will not work in WhatsApp */}
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />

      {/* Website to visit when clicked in fb or WhatsApp */}
      <meta property="og:url" content={url ? url : 'https://redebattle.com.br'} />
      <meta property="og:type" content="website" />
    </>
  )
}
