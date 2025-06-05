import { getAllRomanticDateList } from "@/services/romantic-date-service";
import RomanticDateTableClient from "./romantic-date-table-client";

export default async function RomanticDateTable() {
  const dataList = await getAllRomanticDateList();

  // get all available ids
  const allIds =
    dataList?.payload
      ?.map((item) => item?.id)
      .filter((id): id is number => typeof id === "number") ?? [];

  return <RomanticDateTableClient dataList={dataList} allIds={allIds} />;
}
