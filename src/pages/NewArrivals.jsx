import DrugListPage from "../components/DrugListPage";

const DailyImports = () => {
  return (
    <DrugListPage
      title="واردات اليوم"
      sheetUrl="https://docs.google.com/spreadsheets/d/1pdQigzkO8_qbftl8d9nGRMdJAm_I6rGWQecUm4DUVl4/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
      idPrefix="newarrival"
    />
  );
};

export default DailyImports;
