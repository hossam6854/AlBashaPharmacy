import DrugListPage from "../components/DrugListPage";

const AllDrugs = () => {
  return (
    <>
      <DrugListPage
        title="كل الأصناف"
        sheetUrl="https://docs.google.com/spreadsheets/d/1sgAOJ-kHHkOO8DLDn6b9A85cHBlXp1krWd2W26X5HKc/gviz/tq?tqx=out:json"
        idPrefix="drug"
      />
    </>
  );
};

export default AllDrugs;
