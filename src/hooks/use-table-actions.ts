import { GenericObject } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  data: GenericObject[];
};

export function useTableActions({ data }: Props) {
  const [contents, setContents] = useState<Props["data"]>(data);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function toggleSelectRow(id: number) {
    setContents(
      contents.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            checked: !el.checked,
          };
        }
        return el;
      })
    );
  }

  function selectAll() {
    setContents(
      contents.map((el) => ({
        ...el,
        checked: true,
      }))
    );
  }

  function deselectAll() {
    setContents(
      contents.map((el) => ({
        ...el,
        checked: false,
      }))
    );
  }

  function deleteSelected() {
    const selectedData = contents.filter((el) => el.checked);
    if (!selectedData.length) return;
  }

  function search(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setContents(
        contents.filter((item) =>
          ((item.name || "") as string)
            .toLowerCase()
            .match(e.target.value.toLowerCase())
        )
      );
    } else {
      setContents(data);
    }
  }

  return {
    contents,
    selectedId,
    search,
    setSelectedId,
    selectAll,
    deselectAll,
    toggleSelectRow,
    deleteSelected,
  };
}
