import DrugListPage from "../components/DrugListPage";

const DailyImports = () => {
  return (
    <DrugListPage
      title="واردات اليوم"
      sheetUrl="https://docs.google.com/spreadsheets/d/1S5SvMnIJw7OmifX_o_eRWH-uZwhcM8g9xSPkAB80Hd0/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
      idPrefix="newarrival"
    />
  );
};

export default DailyImports;
