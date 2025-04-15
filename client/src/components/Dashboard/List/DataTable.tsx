import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowLeft, ArrowRight, ArrowUpDown, Dot, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Toolbar from './Toolbar';
import { useTranslation } from 'react-i18next';
import { User } from '../types';
import { Loading } from '@/components/Common/Loading';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface DataTableProps {
  users?: User[];
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
  isLoading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ users, onDelete, onUpdate, isLoading }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const { t } = useTranslation();

  const getStatusBgColor = (status: string) => {
    if (status == 'Online' || status == 'En linea') {
      return '#063207';
    }

    return '#333';
  };

  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      enableSorting: true,
      header: ({ column }) => {
        return (
          <div
            className='flex justify-start cursor-pointer items-center gap-2'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <p>{t('name')}</p>
            <ArrowUpDown size={15} />
          </div>
        );
      },
      cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'email',
      enableSorting: true,
      header: ({ column }) => {
        return (
          <div
            className='flex justify-start cursor-pointer items-center gap-2'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <p> Email</p>
            <ArrowUpDown size={15} />
          </div>
        );
      },
      cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'phone',
      header: () => <div className='justify-start'>{t('phone')}</div>,
      cell: ({ row }) => {
        return <div className='font-medium'>{row.getValue('phone')}</div>;
      },
    },

    {
      accessorKey: 'location',
      header: () => <div className='justify-start'>{t('location')}</div>,
      cell: ({ row }) => {
        return <div className='font-medium'>{row.getValue('location')}</div>;
      },
    },
    {
      accessorKey: 'company',
      header: () => <div className='justify-start'>{t('company')}</div>,
      cell: ({ row }) => {
        return <div className='font-medium'>{row.getValue('company')}</div>;
      },
    },
    {
      accessorKey: 'status',
      enableSorting: true,
      header: ({ column }) => {
        return (
          <div
            className='flex justify-start items-center cursor-pointer gap-1'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <p> {t('status')}</p>
            <ArrowUpDown size={15} />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <Badge
            style={{
              backgroundColor: getStatusBgColor(row.getValue('status')),
              color: '#F2F2F2',
              borderRadius: '5px',
            }}
            className='flex text-left gap-0 border border-gray-800'
          >
            <span>
              <Dot strokeWidth={2} color='white' />
            </span>
            <span>{row.getValue('status')}</span>
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className='flex gap-2'>
            <Pencil
              size={20}
              className='cursor-pointer'
              onClick={() => onUpdate(row.original.id)}
            />{' '}
            <Trash size={20} className='cursor-pointer' onClick={() => onDelete(row.original.id)} />
          </div>
        );
      },
    },
  ];

  const table = useReactTable<User>({
    data: users ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className='w-full'>
      <div className='rounded-sm border shadow-sm bg-[#1A1A1A] border-[#5F5F5F] px-8'>
        <div className='flex items-center py-4'>
          <Toolbar table={table} />
        </div>
        <Table className='min-h-[400px]'>
          <TableHeader className='text-[#BABABA]'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <Loading />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className='max-h-2'
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    {t('noResults')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm font-semibold'>
          {table.getState().pagination.pageIndex + 1} - {table.getPageCount()}{' '}
          {t('of').toLowerCase()} {table.getPreFilteredRowModel().rows.length}
        </div>

        <div className='ml-auto flex items-center gap-8'>
          <div className='flex w-full items-center gap-12'>
            <div className='items-center gap-2 flex'>
              <Label htmlFor='rows-per-page' className='text-sm font-semibold'>
                {t('rowsPerPage')}
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className='w-20 border-[#333] cursor-pointer' id='rows-per-page'>
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent className='bg-[#1A1A1A]' side='top'>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem className='text-[#BABABA]' key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              className='size-8 bg-[#1A1A1A] border-[#333] cursor-pointer'
              size='icon'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>{t('goToPreviousPage')}</span>
              <ArrowLeft color='#7B99FF' />
            </Button>
            <Button
              variant='outline'
              className='size-8 bg-[#1A1A1A] border-[#333] cursor-pointer'
              size='icon'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>{t('goToNextPage')}</span>
              <ArrowRight color='#7B99FF' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
