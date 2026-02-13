
type DataExport = {
	location: string
	content: () => string
};

const data: DataExport[] = [];
export { data }