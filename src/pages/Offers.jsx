import DrugListPage from "../components/DrugListPage";

const Offers = () => {
    return (
      <DrugListPage
        title="العروض المتوفرة"
        sheetUrl="https://docs.google.com/spreadsheets/d/1vrt1DQCbKPradXB2DLAGQH4OGlAht5Ukd_s0lcxFGZY/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
        idPrefix="offer"
      />
    );
  };
  
  export default Offers;
  