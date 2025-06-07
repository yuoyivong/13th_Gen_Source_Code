import { getAllRomanticDateList } from "@/services/romantic-date-service";
import RomanticDateTableClient from "./romantic-date-table-client";

export default async function RomanticDateTable() {
  const dataList = await getAllRomanticDateList();

  // get all available ids
  const allIds =
    dataList?.payload
      ?.map((item) => item?.id)
      .filter((id): id is number => typeof id === "number") ?? [];

  console.log("data list : ", dataList);

  return (
    <RomanticDateTableClient dataList={dataList?.payload} allIds={allIds} />
  );
}
