import DrugListPage from "../components/DrugListPage";

const AllDrugs = () => {
  return (
    <DrugListPage
      title="كل الأصناف"
      sheetUrl="https://docs.google.com/spreadsheets/d/1Bvs8RmPRHQHRFeSaf64xCgb_qJ_dry7YLQtSvhzq0hc/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
      idPrefix="drug"
    />
  );
};

export default AllDrugs;
