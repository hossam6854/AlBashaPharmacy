import DrugListPage from "../components/DrugListPage";

const Offers = () => {
    return (
      <DrugListPage
        title="العروض المتوفرة"
        sheetUrl="https://docs.google.com/spreadsheets/d/16Q6UO1akorwAXFs2QR9aJxTHOaHxzpNlCTM_EL0adP4/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
        idPrefix="offer"
      />
    );
  };
  
  export default Offers;
  