import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";

type Props = {
	onDelete: () => void;
	links: {
		view: string;
		edit: string;
	};
};

export function RowBtnGroup({ onDelete, links }: Props) {
	return (
		<HStack spacing={1}>
			<Button
				as='a'
				href={links.edit}
				variant='outline'
				colorScheme='teal'
				size='xs'
			>
				<EditIcon />&nbsp;Edit
			</Button>
			<Button variant='outline' colorScheme='red' size='xs' onClick={onDelete}>
				<DeleteIcon />&nbsp;Delete
			</Button>
		</HStack>
	);
}
