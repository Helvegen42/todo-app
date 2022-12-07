import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

type BackButtonProps = {
  url: string;
};

const BackButton = (props: BackButtonProps): JSX.Element => {
  return (
    <Link to={props.url} className='btn btn-reverse btn-back'>
      <FaArrowAltCircleLeft /> Back
    </Link>
  );
};

export default BackButton;
