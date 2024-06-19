import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
  } from "@react-email/components";
  import * as React from "react";

  interface VerifyUserEmailTemplateProps {
    inviteLink?: string;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "";
  
  export const VerifyUserEmailTemplate = ({
    inviteLink,
  }: VerifyUserEmailTemplateProps) => {
    const previewText = `Join Andrew Sam`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
              <Section className="mt-[32px]">
                <Img
                  src={`${baseUrl}/static/logo.png`}
                  width="50"
                  height="50"
                  alt="Andrew Sam"
                  className="my-0 mx-auto"
                />
              </Section>
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Join <strong>Andrew Sam</strong>
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Click the button below to join Andrew Sam.
              </Text>
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#D6EADF] rounded text-black text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={inviteLink}
                >
                  Verify Email
                </Button>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                or copy and paste this URL into your browser:{" "}
                <Link href={inviteLink} className="text-blue-600 no-underline">
                  {inviteLink}
                </Link>
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you didn&apos;t try to login, you can safely ignore this email.

              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  VerifyUserEmailTemplate.PreviewProps = {
    inviteLink: `${baseUrl}/static/vercel-user.png`,
  } as VerifyUserEmailTemplateProps;
  
  export default VerifyUserEmailTemplate;
  