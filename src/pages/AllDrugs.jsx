import DrugListPage from "../components/DrugListPage";

const AllDrugs = () => {
  return (
    <DrugListPage
      title="كل الأصناف"
      sheetUrl="https://docs.google.com/spreadsheets/d/1dDNcYxsLP48HCXS-RACAccsMy_HdGlCa25ElYr7oxb8/gviz/tq?sheet=Sheetgo_Sheet2&tqx=out:json"
      idPrefix="drug"
    />
  );
};

export default AllDrugs;
