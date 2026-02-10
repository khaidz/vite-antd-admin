import type { ParamsType, ProColumns, ProTableProps } from "@ant-design/pro-components";

import { type TablePaginationConfig } from "antd";
import { Resizable } from 'react-resizable';

import { LoadingOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { useSize } from "ahooks";
import { useEffect, useMemo, useRef, useState, type JSX } from "react";
import 'react-resizable/css/styles.css';
import { BASIC_TABLE_ROOT_CLASS_NAME } from "./constants";
import { useStyles } from "./styles";
import clsx from "clsx";
import { isObject, isUndefined } from "@/utils/is";

export interface BasicTableProps<D, U, V> extends ProTableProps<D, U, V> {

	adaptive?: boolean | {
		offsetBottom?: number
	}
	resizeable?: boolean;
	searchForm?: (props: ProTableProps<D, U, V>, defaultDom: JSX.Element) => React.ReactNode
}

const ResizeableTitle = (props: any) => {
	const { onResize, width, ...restProps } = props;

	if (!width) return <th {...restProps} />;

	return (
		<Resizable
			width={width}
			height={0}
			handle={
				<span
					className="react-resizable-handle"
					onClick={(e) => e.stopPropagation()}
				/>
			}
			onResize={onResize}
			draggableOpts={{ enableUserSelectHack: false }}
		>
			<th {...restProps} />
		</Resizable>
	);
};

export function BasicTable<
	DataType extends Record<string, any>,
	Params extends ParamsType = ParamsType,
	ValueType = "text",
>(
	props: BasicTableProps<DataType, Params, ValueType>,
) {
	const classes = useStyles();
	const { adaptive } = props;
	const tableWrapperRef = useRef<HTMLDivElement>(null);
	const size = useSize(tableWrapperRef);
	
	const [scrollY, setScrollY] = useState<number | string | undefined>(adaptive ? "initial" : undefined);
	const [innerColumns, setInnerColumns] = useState<
		ProColumns<DataType, ValueType>[] | undefined
	>(props.columns);


	const getPaginationProps = () => {
		if (props.pagination === false) {
			return false;
		}

		return {
			placement: ["bottomStart"],
			defaultPageSize: 10,
			showQuickJumper: true,
			showSizeChanger: true,
			showTotal: total => `Total ${total} items`,
			...props.pagination,
		} satisfies TablePaginationConfig;
	};

	const paginationHeight = useMemo(() => {
		const paginationProps = getPaginationProps();
		const isPaginationDisabled = paginationProps === false;
		if (isPaginationDisabled) {
			return 0;
		}
		else {
			if (!paginationProps.size) {
				return 32 + 16 + 16;
			}
			else {
				return 24 + 16 + 16;
			}
		}
	}, [getPaginationProps]);

	useEffect(() => {
		if (!isUndefined(props.scroll?.y)) {
			// 如果 scroll.y 已经被设置，则不进行高度自适应
			return;
		}

		if (adaptive && tableWrapperRef.current && size?.height) {
			const basicTable = tableWrapperRef.current.getElementsByClassName(BASIC_TABLE_ROOT_CLASS_NAME)[0];

			if (!basicTable)
				return;

			const tableWrapperRect = tableWrapperRef.current.getBoundingClientRect();

			if (tableWrapperRect.top > window.innerHeight) {
				return;
			}

			const tableBody = basicTable.querySelector("div.ant-table-body");

			if (!tableBody)
				return;

			const tableBodyRect = tableBody.getBoundingClientRect();

			const offsetBottom = isObject(adaptive) ? (adaptive.offsetBottom ?? 16) : 16;

			const realOffsetBottom = offsetBottom + paginationHeight + 48;

			const bodyHeight = window.innerHeight - tableBodyRect.top - realOffsetBottom;
			
			tableBody.setAttribute("style", `overflow-y: auto;min-height: ${bodyHeight}px;max-height: ${bodyHeight}px;`);
			setScrollY(bodyHeight);
		}
	}, [size, adaptive, paginationHeight, props.scroll?.y]);

	useEffect(() => {
		setInnerColumns(props.columns);
	}, [props.columns]);

	const mergedColumns = useMemo(() => {
		if (!innerColumns) return innerColumns;

		return innerColumns.map((col: any, index: number) => {
			if (!col.width) return col;

			return {
				...col,
				onHeaderCell: (column: any) => ({
					width: column.width,
					onResize: (_: any, { size }: any) => {
						setInnerColumns((prev) => {
							if (!prev) return prev;

							const next = [...prev];
							next[index] = {
								...next[index],
								width: size.width,
							};
							return next;
						});
					},
				}),
			};
		});
	}, [innerColumns]);

	const getLoadingProps = () => {
		if (props.loading === false) {
			return false;
		}
		if (props.loading === true) {
			return true;
		}
		return {
			indicator: <LoadingOutlined spin />,
			...props.loading,
		};
	};

	return (
		<div className="h-full" ref={tableWrapperRef}>
			<ProTable
				components={{
					header: {
						cell: ResizeableTitle,
					},
				}}
				cardBordered
				rowKey="id"
				dateFormatter="string"
				{...props}
				columns={props.resizeable ? mergedColumns : props.columns}
				options={{
					fullScreen: true,
					...props.options,
				}}
				rootClassName={clsx(BASIC_TABLE_ROOT_CLASS_NAME, props.rootClassName)}
				className={clsx(classes.basicTable, props.className)}
				scroll={{ y: scrollY, x: "max-content", ...props.scroll }}
				loading={getLoadingProps()}
				pagination={getPaginationProps()}
				expandable={{
					// expandIcon: ({ expanded, onExpand, record }) => {
					// 	return expanded
					// 		? (
					// 			<RightOutlined onClick={e => onExpand(record, e)} />
					// 		)
					// 		: (
					// 			<DownOutlined onClick={e => onExpand(record, e)} />
					// 		);
					// },
					...props.expandable,
				}}
				searchFormRender={props?.searchForm ? props.searchForm : props.searchFormRender}
			/>
		</div>
	);
}
