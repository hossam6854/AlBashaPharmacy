import DrugListPage from "../components/DrugListPage";

const Offers = () => {
  return (
    <DrugListPage
      title="العروض المتوفرة"
      sheetUrl="https://docs.google.com/spreadsheets/d/18lm39eqpf7AEcO_gRHCEKyhtWecP6BDSp6LsTQIucOM/gviz/tq?tqx=out:json"
      idPrefix="offer"
    />
  );
};

export default Offers;
