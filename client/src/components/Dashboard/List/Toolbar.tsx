import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { User } from '../types';

interface ToolbarProps {
  table: Table<User>;
}

const Toolbar: React.FC<ToolbarProps> = ({ table }) => {
  const { t } = useTranslation();
  return (
    <div className='flex justify-between py-4 px-4 items-center w-full'>
      <p className='text-white text-xl font-bold'>{t('allUsers')}</p>
      <div className='relative max-w-sm'>
        <Search className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder={`${t('searchFor')}...`}
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className='pl-8 max-w-sm'
        />
      </div>
    </div>
  );
};

export default Toolbar;
