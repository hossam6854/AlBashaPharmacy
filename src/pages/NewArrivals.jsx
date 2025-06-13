import DrugListPage from "../components/DrugListPage";

const DailyImports = () => {
  return (
    <DrugListPage
      title="واردات اليوم"
      sheetUrl="https://docs.google.com/spreadsheets/d/1xP7AwfhVCRT64pO5xZoQfWPkvsEXp_wRJsT2KvMtZvo/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
      idPrefix="newarrival"
    />
  );
};

export default DailyImports;
