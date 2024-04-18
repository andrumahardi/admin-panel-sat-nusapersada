type ListResponse = Array<{
	id: number;
  name: string;
  username: string;
  email: string;
}>;

type DetailResponse = {
	id: number;
  name: string;
  username: string;
  email: string;
};

export type ListModel = ReturnType<typeof listModel>;
export function listModel(data: ListResponse) {
  return data.map((el) => ({
    id: el.id,
		name: el.name || "-",
    username: el.username || "-",
    email: el.email || "-",
    checked: false,
  }));
}

export type DetailModel = ReturnType<typeof detailModel>;
export function detailModel(data: DetailResponse) {
  return {
		name: data.name || "-",
    username: data.username || "",
    email: data.email || "",
  };
}
