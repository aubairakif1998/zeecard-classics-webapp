import { useParams } from "react-router-dom";
const LinkModal = () => {
  const params = useParams();
  return <div> {params.linktype}</div>;
};

export default LinkModal;
