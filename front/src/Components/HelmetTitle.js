import { Helmet } from "react-helmet-async";

function HelmetTitle({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default HelmetTitle;