import DrugListPage from "../components/DrugListPage";

const AllDrugs = () => {
  return (
    <DrugListPage
      title="كل الأصناف"
      sheetUrl="https://docs.google.com/spreadsheets/d/1Pzl4Ty5TpAOXDgJoq_R4_9bEVi34dh3VHqVIAq-g8T4/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
      idPrefix="drug"
    />
  );
};
export default AllDrugs;
