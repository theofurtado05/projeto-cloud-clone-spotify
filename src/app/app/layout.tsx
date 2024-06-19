import { MainSidebar } from "./_components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/context/user.context"
import { useWorkflow, WorkflowProvider } from '@/context/workflow.context'
import ModalUpgrade from "./_components/modal-upgrade"
import Script from "next/script"


export const metadata = {
  title: 'TheoFy',
  description: 'Escute musicas no TheoFy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  
  return (
    <>
    <body className="grid grid-cols-1 h-screen overflow-x-hidden">
      <ThemeProvider
        attribute="class"
        enableSystem={true}
        defaultTheme="dark"
      >
        <WorkflowProvider>
          <UserProvider>
                  <>
                    <MainSidebar/>
                    <main className="sm:ml-[255px] relative">
                          {children}
                          
                    </main>
                  </>
          </UserProvider>
        </WorkflowProvider>
      </ThemeProvider>
      <footer>
      <Script strategy="afterInteractive">
        {`
          function work() {
              function getParams() {
                  const url = new URL(window.location.href);
                  const src = url.searchParams.get("src");
                  const sck = url.searchParams.get("sck");
                  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
                      .map(param => \`\${param}=\${encodeURIComponent(url.searchParams.get(param) || '')}\`)
                      .join('&');
                  let allParams = '';
                  if (src) allParams += \`src=\${encodeURIComponent(src)}&\`;
                  if (sck) allParams += \`sck=\${encodeURIComponent(sck)}&\`;
                  allParams += utmParams;
                  return allParams;
              }
              (function updateLinks() {
                  document.querySelectorAll("a").forEach((link) => {
                      const params = getParams();
                      if (params) {
                          link.href += link.href.includes("?") ? \`&\${params}\` : \`?\${params}\`;
                      }
                  });
              })();
          }
          if (document.readyState === "complete") {
              work();
          } else {
              window.addEventListener("load", work);
          }
        `}
        </Script>
      </footer>
    </body>
    
    </>
  )
}
