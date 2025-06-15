import DrugListPage from "../components/DrugListPage";

const DailyImports = () => {
  return (
    <DrugListPage
      title="واردات اليوم"
      sheetUrl="https://docs.google.com/spreadsheets/d/1GeNdxT62C_gunR2veQvKyRuyGokZUv4sOcSv12uQT14/gviz/tq?tqx=out:json"
      idPrefix="newarrival"
    />
  );
};
export default DailyImports;
