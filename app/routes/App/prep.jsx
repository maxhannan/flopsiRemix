import { useNavigation } from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";

const Prep = () => {
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }

  return <h1>prep</h1>;
};

export default Prep;
