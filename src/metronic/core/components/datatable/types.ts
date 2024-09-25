// Define the sort order and filter criteria types
export type DataTableSortOrderInterface = 'asc' | 'desc' | '';

export interface DataTableDataInterface {
	[key: string]: string | number | boolean | object;
}

export interface DataTableAttributeInterface {
	[index: number]: { [key: string]: string };
}

export interface DataTableStateInterface {
	page: number;
	sortField: keyof DataTableDataInterface | number;
	sortOrder: DataTableSortOrderInterface;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	selectedRows: number[];
	filters: DataTableColumnFilterInterface[];
	search: string | object;
	originalData: DataTableDataInterface[];
	originalDataAttributes: DataTableAttributeInterface[]
	_contentChecksum?: string;
	_configChecksum?: string;
}

/**
 * The public methods of the DataTable component
 */
export interface DataTableInterface {
	/**
	 * Sort the data by the given field. The sort order is ASC by default.
	 * @param field The field to sort the data by
	 */
	sort: (field: keyof DataTableDataInterface | number) => void;

	/**
	 * Go to the given page.
	 * @param page The page number to go to
	 */
	goPage: (page: number) => void;

	/**
	 * Reload the data from the API endpoint.
	 */
	reload: () => void;

	/**
	 * Set the page size.
	 * @param size The new page size
	 */
	setPageSize: (pageSize: number) => void;

	showSpinner(): void;

	hideSpinner(): void;
}

export interface DatatableResponseDataInterface {
	data: DataTableDataInterface[];
	totalCount: number;
}

// Define the DataTable options type
export interface DataTableConfigInterface {
	requestMethod?: string;
	requestHeaders?: { [key: string]: string };
	apiEndpoint?: string;
	mapResponse?: (data: DatatableResponseDataInterface) => DatatableResponseDataInterface;
	mapRequest?: (query: URLSearchParams) => URLSearchParams;

	pageSize?: number;
	pageMore?: boolean;
	pageMoreLimit?: number;
	stateSave?: boolean;
	stateNamespace?: string;
	pageSizes?: number[];
	columns?: {
		[key: keyof DataTableDataInterface | string]: {
			title?: string,
			render?: (item: DataTableDataInterface[keyof DataTableDataInterface] | string, data: DataTableDataInterface, context: DataTableInterface) => string,
			checkbox?: boolean,
			createdCell?: (cell: HTMLTableCellElement, cellData: DataTableDataInterface[keyof DataTableDataInterface] | string, rowData: DataTableDataInterface, row: HTMLTableRowElement) => void,
		}
	};

	infoEmpty?: string;

	info?: string;

	loading?: {
		template: string,
		content: string,
	};

	sort?: {
		classes?: {
			base?: string,
			asc?: string,
			desc?: string,
		};
		// local data sort callback
		callback?: (data: DataTableDataInterface[], sortField: keyof DataTableDataInterface | number, sortOrder: DataTableSortOrderInterface) => DataTableDataInterface[];
	},

	search?: {
		delay?: number, // delay in milliseconds
		callback?: (data: DataTableDataInterface[], search: string) => DataTableDataInterface[]; // search callback
	},

	pagination?: {
		number: {
			class: string,
			text: string,
		},
		previous: {
			class: string,
			text: string,
		},
		next: {
			class: string,
			text: string,
		},
		more: {
			class: string,
			text: string,
		}
	},

	attributes?: {
		table?: string,
		info?: string,
		size?: string,
		pagination?: string,
		spinner?: string,
		check?: string,
		checkbox?: string,
	},

	checkbox?: {
		checkedClass?: string,
	}

	_state?: DataTableStateInterface;
	_data?: DataTableDataInterface[];

}

export type DataTableColumnFilterTypeInterface = 'text' | 'numeric' | 'dateRange';

export type DataTableColumnFilterInterface = {
	column: keyof DataTableDataInterface;
	type: DataTableColumnFilterTypeInterface;
	value: string;
};

export interface DatatableCheckConfigInterface {
	target: string;
	checkedClass: string;
}

export interface DatatableCheckInterface {
	toggle(): void;
	check(): void;
	uncheck(): void;
	isChecked(): boolean;
	getChecked(): string[];
}

export interface DatatableCheckChangePayloadInterface {
	cancel?: boolean;
}