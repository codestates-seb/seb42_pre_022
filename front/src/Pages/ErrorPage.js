import HelmetTitle from "../Components/HelmetTitle";

function ErrorPage() {

  return (
    <div className="content">
      <HelmetTitle title={`Page not found - Stack Overflow`} />
      <h1 className="error">Page Not Found</h1>
    </div>
  )
}

export default ErrorPage;