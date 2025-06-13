import DrugListPage from "../components/DrugListPage";

const Offers = () => {
    return (
      <DrugListPage
        title="العروض المتوفرة"
        sheetUrl="https://docs.google.com/spreadsheets/d/1kjFu4FhxEd3vk7OStWUv9WsoJ1PO5IAyGmxb9ii_zwU/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
        idPrefix="offer"
      />
    );
  };
  
  export default Offers;
  