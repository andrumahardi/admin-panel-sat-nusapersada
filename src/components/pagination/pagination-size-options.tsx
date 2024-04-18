import { HStack, Select, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

export type PaginationSizeOptionsProps = {
	pageSize: number;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export function PaginationSizeOptions({
	pageSize,
	onChange,
}: PaginationSizeOptionsProps) {
	return (
		<HStack>
			<Text>Showing</Text>
			<Select size='xs' value={pageSize} onChange={onChange}>
				<option value=''>10</option>
			</Select>
			<Text>entries</Text>
		</HStack>
	);
}
