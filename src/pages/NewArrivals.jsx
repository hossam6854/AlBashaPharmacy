import DrugListPage from "../components/DrugListPage";

const DailyImports = () => {
  return (
    <DrugListPage
      title="واردات اليوم"
      sheetUrl="https://docs.google.com/spreadsheets/d/1hOqNN8ikhB9pn3c7jlTtlfGPRZf8pVi6mxKgSUbz93w/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
      idPrefix="newarrival"
    />
  );
};
export default DailyImports;
