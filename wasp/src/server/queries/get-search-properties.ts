import { Prisma } from "@prisma/client";
import {
	GetSearchPropertiesRequest,
	GetSearchPropertiesResponse,
} from "@wasp/shared/types/queries";

export const getSearchProperties = async (
	args: GetSearchPropertiesRequest,
	context: any,
): Promise<GetSearchPropertiesResponse> => {
	const delegate = context.entities.Source as Prisma.SourceDelegate<{}>;
	const sources = await delegate.findMany({});
	return {
		sources,
	};
};
