import DrugListPage from "../components/DrugListPage";

const DailyImports = () => {
  return (
    <DrugListPage
      title="واردات اليوم"
      sheetUrl="https://docs.google.com/spreadsheets/d/1a-Zm6VtIuG6hPD2CZyzTH_3MUCjDXOBv6ecb434vrRE/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
      idPrefix="newarrival"
    />
  );
};

export default DailyImports;
