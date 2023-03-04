import React from "react";
import "./PageError.css";
import { Button } from "react-bootstrap";

const PageError = () => {
  return (
    <div className="page-error-section">
      <h1 className="mb-5">
        <a href="/" className="error-brand pb-2">
          iAte
        </a>
      </h1>
      <h1 className="error-text">Oops!</h1>
      <p className="error-text-small">
        It looks like something went wrong.
        <br />
        Please try again later or contact us if the problem persists.
      </p>
      <Button className="error-btn btn-success mt-2" onClick={() => window.location.assign("/")}>
        Back to iAte
      </Button>
    </div>
  );
};

export default PageError;
