import DrugListPage from "../components/DrugListPage";

const Offers = () => {
    return (
      <DrugListPage
        title="العروض المتوفرة"
        sheetUrl="https://docs.google.com/spreadsheets/d/1cYpamf5gHNPkHAFBOvzMjwXMVxZ8mRtAsZrL-Ym7YPE/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
        idPrefix="offer"
      />
    );
  };
  
  export default Offers;
  