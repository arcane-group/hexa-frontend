import { Box } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { useMemo } from 'react'

import { Container } from '@/components/Container'
import px2vw from '@/utils/px2vw'

const Page = () => {
  const { i18n } = useLingui()

  const main = useMemo(() => {
    if (i18n.locale === 'zh') {
      return <>zh</>
    }

    return (
      <>
        1. Company and regulation details
        <br />
        Any reference within the pages of this site to “we, “our”, “us”, “Hexa Hub” means Arcane
        Link Pte. Ltd. together with its subsidiaries, subsidiary undertakings and associated
        companies (whether direct or indirect) from time to time.
        <br />
        <br />
        2. Website Content
        <br />
        Website Content The content of this website is intended to convey general information about
        Arcane Group. The information, products and services on this website are provided on a
        strictly “as is”, “where available” and “where is” basis. They should not be relied upon as
        legal, tax or investment or financial advice. This website is not intended to create a
        principal-agent or fiduciary relationship. Equally,
        <br />
        The content of any e-mail sent to Arcane Group or any of its employees at any e-mail
        addresses set forth in this website will not create a principal-agent or fiduciary
        relationship and will not be treated as confidential. All uses of the contents of this site,
        other than personal uses, are prohibited.
        <br />
        Any Arcane Group website, and any content therein:
        <br />
        should not be construed as a substitute for tailored investment advice and not be used as a
        basis for making investment decisions;
        <br />
        is not intended, as an attempt to market or promote any type of Digital Asset;
        <br />
        does not constitute an invitation to invest in any Digital Asset; <br />
        and constitute or form a part of any oﬀer for the sale or subscription of, or any invitation
        to offer to buy or subscribe for, any Digital Asset.
        <br />
        <br />
        3. Intellectual Property
        <br />
        Unless otherwise indicated by Arcane Group, all copyright and other intellectual property
        rights in all content and other materials contained in any Arcane Group website or provided
        in connection with the any services, including, without limitation, logos and all designs,
        text, graphics, pictures, information, data, software, sound files, other files and the
        selection and arrangement thereof (collectively, “Our Materials“) are the proprietary
        property of Arcane Group or their licensors or suppliers and are protected by Singapore and
        international copyright laws and other intellectual property rights laws.
        <br />
        Arcane Group hereby grants the Client a limited, revocable, non-exclusive and
        non-sub-licensable license to access and use Our Materials for his or her personal or
        internal business use limitedly to use the Services. Such license does not permit: (a) any
        resale of Our Materials; (b) the distribution, public performance or public display of any
        of Our Materials; (c) modifying or otherwise making any derivative uses of Our Materials, or
        any portion thereof; or (d) any use of Our Materials other than for their intended purposes.
        The license granted under this Section will automatically terminate if Arcane Group suspend
        or terminate the users access to the Services or any Arcane Group website.
        <br />
        Trademarks and any other product or service names, logos or slogans that may appear on our
        website or materials belong to and are owned by Arcane Group, in Singapore and in other
        countries, and may not be copied, imitated or used, in whole or in part, without our prior
        written permission. The Client may not use any trademark, product or service name of Arcane
        Group without their prior written permission, including without limitation any metatags or
        other “hidden text” utilizing any trademark, product or service name of Arcane Group. In
        addition, the look and feel of Arcane Group’s Services, including all page headers, custom
        graphics, button icons and scripts, is the service mark, trademark and / or trade dress of
        Arcane Group and may not be copied, imitated or used, in whole or in part, without our prior
        written permission. All other trademarks, registered trademarks, product names and company
        names or logos mentioned through our Services are the property of their respective owners.
        <br />
        <br />
        4. No Warranties
        <br />
        Arcane Group does not provide any warranties (either express or implied) with respect to the
        information and/or services provided on the Arcane Group website and/or your use of any
        Arcane Group website generally, for any particular purpose.
        <br />
        Arcane Group expressly disclaims any implied warranties, including but not limited to,
        warranties of title, non-infringement, merchantability or fitness for a particular purpose.
        Arcane Group will not be responsible for any loss or damage that could result from
        interception by third parties of any information or services made available to you via this
        website.
        <br />
        Arcane Group cannot and does not guarantee, sponsor, endorse, verify, or warrant the
        accuracy, validity, timeliness, or completeness of any information, data, products,
        services, processes or other information made available to you for any particular purpose
        (including any information found at external sites or links).
        <br />
        <br />
        5. Limitation of Liability
        <br />
        Neither Arcane Group, nor any of its affiliates, directors, officers or employees, nor any
        third party providers of content, software and/or technology (the “Arcane Group parties”),
        will be liable or have any responsibility of any kind for any loss or damage that you incur
        in the event of any failure or interruption of any access to any Arcane Group website, or
        resulting from the act or omission of any other party involved in making or hosting any
        Arcane Group website, the data contained therein or the products or services offered thereby
        available to you, or from any other cause relating to your access to, inability to access,
        or use of any Arcane Group site or the materials contained therein.
        <br />
        In no event will any Arcane Group Party be liable to you, whether in contract or tort, for
        any direct, special, indirect, consequential or incidental damages or any other damages of
        any kind. This limitation on liability includes, but is not limited to, the transmission of
        any viruses which may infect a user’s equipment, failure of mechanical or electronic
        equipment or communication lines, telephone or other interconnect problems, unauthorized
        access, theft, operator errors, strikes or other labour problems or any force majeure.
        Arcane Group cannot and does not guarantee continuous, uninterrupted or secure access to any
        Arcane Group website.
        <br />
        <br />
        6. Our Publications and Market Updates
        <br />
        Arcane Group publications should not be construed as legal, tax, investment of financial
        advice on any specific facts or circumstances. The mailing of our publications is not
        intended to create, and receipt of them does not constitute, an principal-agent or fiduciary
        relationship. The views set forth therein are the personal views of the author and do not
        necessarily reflect those of Arcane Group.
        <br />
        Arcane Group publications and any content therein should not be construed as a substitute
        for tailored investment advice and not be used as a basis for making investment decisions
        and is not intended, as an attempt to market or promote any type of Digital Asset. For the
        avoidance of doubt, the contents of any Arcane Group publication does not constitute an
        invitation to invest in any Digital Asset or constitute or form a part of any oﬀer for the
        sale or subscription of, or any invitation to oﬀer to buy or subscribe for, any Digital
        Asset.
        <br />
        The publications and the contents such publications:
        <br />
        are intended for general information purposes only;
        <br />
        are for the benefit of their recipients; <br />
        and may not be (i) circulated or distributed to any other person, (ii) quoted or (iii)
        referred to in any other publication or proceeding, without the prior written consent of
        Arcane Group, to be given or withheld at our sole and absolute discretion.
        <br />
        To request reprint permission for any of our publications, please go to the Contact Us
        section located on this website.
        <br />
        7. Governing Law and Dispute Resolution
        <br />
        Irrespective of the country from which you access or use this Form or our Services, to the
        extent permitted by law, these disclaimers and legal notices shall be governed in accordance
        with the laws of Singapore without regard to choice or conflicts of law principles, and you
        hereby agree to submit to the exclusive jurisdiction of the courts of Singapore to resolve
        any claims or disputes which may arise in connection with this Policy.
      </>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.locale])

  return (
    <>
      <Box
        as='main'
        minH='100vh'
        color='#000'
        py={{
          base: px2vw(20),
          lg: '120px',
        }}
        textStyle={'csmp'}
      >
        <Container maxW='1060px'>{main}</Container>
      </Box>
    </>
  )
}
export default Page

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Terms and Conditions',
      headerPosition: 'relative',
    },
  }
}
