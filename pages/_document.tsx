import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/*Start of Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZM985DLTVZ"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZM985DLTVZ');
          `}
        </script>
        {/*End of Google Analytics */}
        {/*Start of Tawk.to Script*/}
        <script type="text/javascript">
          {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6a063292e57a6a1c342a416c/1jok3b35r';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();`}
        </script>
        {/*End of Tawk.to Script*/}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}